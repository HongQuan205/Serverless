'use strict'

const userRepo = require('../../layer/repository/UserRepository')
const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')
const utility = require('../../layer/utility')
require('dotenv').config();



module.exports.createUser = async (event) => {
    try {
        const { Authorization } = event.headers;
        const jwttoken = Authorization ? Authorization.split(' ')[1] : '';
        if (jwttoken) {
            const { userId } = jwt.verify(jwttoken, process.env.jwt_secret);
            const eventBody = JSON.parse(event.body);
            const { name, age, phone_number, address, username, password } = eventBody;
            if (!name || !age || !phone_number || !address || !username || !password) {
                return utility.createResponse(false, null, 500, "Error in Internal");
            }
            const checkUserInDb = await userRepo.getUserByUsername(username);
            if(checkUserInDb.username === username)
            {
                return utility.createResponse(false,null,500, "User is existed");
            }
            const createUser = {
                name: eventBody.name,
                age: eventBody.age,
                phone_number: eventBody.phone_number,
                address: eventBody.address,
                username: eventBody.username,
                password: passwordHash.generate(eventBody.password),
            }
            let user = await userRepo.createUser(createUser);
     
            if (user == null) {
                return utility.createResponse(false, null, 500, "Get Fail User");

            }
            return utility.createResponse(true, user, 200, "Create User Successfully");
        }
        else {
            return utility.createResponse(false, null, 401, "UnAuthorization");
        }
    } catch (error) {
        console.log(error)
        return utility.createResponse(false, null, 401, "UnAuthorization")
    }
}
