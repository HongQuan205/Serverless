'use strict'

const userRepo = require('../../layer/repository/UserRepository')
const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')
const utility = require('../../layer/utility/utility')
require('dotenv').config();



module.exports.createUser = async (event) => {
    try {
        const { Authorization } = event.headers;
        const jwttoken = Authorization ? Authorization.split(' ')[1] : '';
            const { userId } = jwt.verify(jwttoken, process.env.jwt_secret);
            const eventBody = JSON.parse(event.body);
            const { name, age, phone_number, address, username, password } = eventBody;
            if (!name || !age || !phone_number || !address || !username || !password) {
                return utility.createResponse(false, null, 500, "Input is invalid");
            }
            const checkUserInDb = await userRepo.getUserByUsername(username);
            if(checkUserInDb)
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
                token: jwttoken
            }
            let user = await userRepo.createUser(createUser);
     
            if (!user) {
                return utility.createResponse(false, null, 500, "Create user fail");

            }
            return utility.createResponse(true, user, 200, "Create User Successfully");
    } catch (error) {
        console.log(error)
        return utility.createResponse(false, null, 500, "Error in internal")
    }
}
