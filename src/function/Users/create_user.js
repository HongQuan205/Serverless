'use strict'

const userRepo = require('respository').UserRepository
const passwordHash = require('password-hash')
const utility = require('utility')

const { message, code } = require('constant').common
require('dotenv').config();



module.exports.createUser = async (event) => {
    try {
        const eventBody = JSON.parse(event.body);
        const { name, age, phone_number, address, username, password } = eventBody;
        if (!name || !age || !phone_number || !address || !username || !password) {
            return utility.createResponse(false, null, code.ERROR, message.SUCCESS);
        }
        const checkUserInDb = await userRepo.getUserByUsername(username);
        if (checkUserInDb) {
            return utility.createResponse(false, null, code.ERROR, message.user_existed);
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
            return utility.createResponse(false, null, code.ERROR, message.server_error);
        }
        return utility.createResponse(true, user, code.SUCCESS, message.SUCCESS);
    } catch (error) {
        console.log(error)
        return utility.createResponse(false, null, code.ERROR, message.server_error);
    }
}
