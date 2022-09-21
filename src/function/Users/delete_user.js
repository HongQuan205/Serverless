'use strict'

const userRepo = require('../../layer/repository/UserRepository')
const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')
const utility = require('../../layer/utility/utility')
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
        return utility.createResponse(true, response, 200, "Delete User Successfully");
    } catch (error) {
        console.log(error);
        utility.createResponse(false, null, 401, "UnAuthorization");
    }
}