'use strict'

const userRepo = require('../../layer/repository/UserRepository')
const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')
const utility = require('../../layer/utility')
require('dotenv').config();
module.exports.getUserById = async (event) => {
    try {
        const { Authorization } = event.headers;
        const jwttoken = Authorization ? Authorization.split(' ')[1] : '';
        const { userId, username } = jwt.verify(jwttoken, process.env.jwt_secret);
        if (jwttoken) {
            let id = event.pathParameters.id;
            let user = await userRepo.getUserById(id)
            if (user == null) {
                return utility.createResponse(false, null, 400, "Get Fail User")
            }
            return utility.createResponse(true, user, 200, "Get User Successfully");
        }
        else {
            return utility.createResponse(false, null, 401, "UnAuthorization")
        }
    } catch (error) {
        console.log(error);
        return utility.createResponse(false, null, 401, "UnAuthorization")
    }
}
