'use strict'

const userRepo = require('repository').UserRepository
const utility = require('utility')
const { message, code } = require('constant').common
require('dotenv').config();


module.exports.deleteUser = async (event) => {
    try {
        const {ids} = JSON.parse(event.body);
        let count =0;
        for(var i =0;i< ids.length;i++)
        {
            let deleteUser = await userRepo.deleteUser(ids[i]);
            if(deleteUser)
            {
                count++;
            }
        }
        let response = "Can deletes: " + count +"/"+this.deleteUser.length
        return utility.createResponse(true, response, code.SUCCESS, message.SUCCESS);
    } catch (error) {
        console.log(error);
        return utility.createResponse(false, null, code.ERROR, message.server_error);
    }
}