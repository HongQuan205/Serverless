'use strict'

const userRepo = require('../../layer/repository/UserRepository')
const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')
const utility = require('../../layer/utility')
require('dotenv').config();






module.exports.updateUser = async (event) => {
    try {
        const { Authorization } = event.headers;
        const jwttoken = Authorization ? Authorization.split(' ')[1] : '';
        if (jwttoken) {
            const eventBody = JSON.parse(event.body);
            const updateUser = await userRepo.updateUser(eventBody);
            if (updateUser == null) {
                return utility.createResponse(false,null,500,"User not existed");
            }
            return utility.createResponse(true,updateUser,200,"Update user successfully");
        }
    } catch (error) {
        utility.createResponse(false, null, 401, "UnAuthorization");
        console.log(error)
    }
}