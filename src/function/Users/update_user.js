'use strict'

const userRepo = require('repository').UserRepository
const { message, code } = require('constant').common
const utility = require('utility')
require('dotenv').config();


module.exports.updateUser = async (event) => {
    try {
        const eventBody = JSON.parse(event.body);
        const updateUser = await userRepo.updateUser(eventBody);
        if (updateUser == null) {
            return utility.createResponse(false, null, code.ERROR, message.server_error);
        }
        return utility.createResponse(true, user, code.SUCCESS, message.SUCCESS);
    } catch (error) {
        return utility.createResponse(false, null, code.ERROR, message.server_error);
        console.log(error)
    }
}