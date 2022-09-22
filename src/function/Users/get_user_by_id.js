'use strict'

const userRepo = require('repository').UserRepository
const utility = require('utility')

const { message, code } = require('constant').common
require('dotenv').config();
module.exports.getUserById = async (event) => {
    try {
        let id = event.pathParameters.id;
        let user = await userRepo.getUserById(id)
        if (user == null) {
            return utility.createResponse(false, null, code.ERROR, message.server_error)
        }
        return utility.createResponse(true, user, code.SUCCESS, message.SUCCESS);
    } catch (error) {
        console.log(error);
        return utility.createResponse(false, null, code.ERROR, message.server_error);
    }
}
