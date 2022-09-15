'use strict'

const userRepo = require('../../layer/repository/UserRepository')
const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')
const utility = require('../../layer/utility')
require('dotenv').config();





module.exports.deleteUser = async (event) => {
    try {
        const { Authorization } = event.headers;
        const jwttoken = Authorization ? Authorization.split(' ')[1] : '';
        if (jwttoken) {
            const eventBody = JSON.parse(event.body);
            const deleteUser = await userRepo.deleteUser(eventBody.id);
            if (!deleteUser) {
                return utility.createResponse(false, null, 500, "Delete Fail User");
            }
            return utility.createResponse(true, deleteUser, 200, "Delete User Successfully");
        }
        else {
            utility.createResponse(false, null, 401, "UnAuthorization");
        }
    } catch (error) {
        console.log(error);
        utility.createResponse(false, null, 401, "UnAuthorization");
    }
}