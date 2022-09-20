'use strict'

const userRepo = require('../../layer/repository/UserRepository')
const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')
const utility = require('../../layer/utility')
require('dotenv').config();

module.exports.login = async (event) => {
    try {
        const { username, password } = JSON.parse(event.body);
        const getUserFromUsername = await userRepo.getUserByUsername(username);
        if(getUserFromUsername === null)
        {
            return  utility.createResponse(false, null, 500, "User is not existed");
        }
        if (!passwordHash.verify(password, getUserFromUsername.password)) {
            return  utility.createResponse(false, null, 404, "Password is incorrect");
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
        return utility.createResponse(true, result, 200, "Login successfully");
    } catch (error) {
        console.log(error)
        return utility.createResponse(false, null, 500, "Error Internal");
    }

}