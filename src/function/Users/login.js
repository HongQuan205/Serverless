'use strict'

const userRepo = require('repository').UserRepository
const passwordHash = require('password-hash')
const utility = require('utility')
const { message, code } = require('constant').common
require('dotenv').config();

module.exports.login = async (event) => {
    try {
        console.log("hongquan")
        const { username, password } = JSON.parse(event.body);
        const getUserFromUsername = await userRepo.getUserByUsername(username);
        if(getUserFromUsername === null)
        {
            return  utility.createResponse(false, null, code.ERROR, message.user_not_existed);
        }
        if (!passwordHash.verify(password, getUserFromUsername.password)) {
            return  utility.createResponse(false, null, code.ERROR, message.setting_password_pending);
        }
        const data = {
            userId: getUserFromUsername.id,
            username: getUserFromUsername.username
        }
        let token = utility.createToken(data);
        const result = {
            username: getUserFromUsername.username,
            token: token
        }
        return utility.createResponse(true, user, code.SUCCESS, message.SUCCESS);
    } catch (error) {
        console.log(error)
        return utility.createResponse(false, null, code.ERROR, message.server_error);
    }

}