'use strict'

require('dotenv').config();
const scoreRepo = require('../../repository/ScoresRepository')
const userRepo = require('../../repository/UserRepository')
const utility = require('../../layer/utility/utility')
module.exports.getAllScoreFromUser = async (event) => {
    try {
        const { Authorization } = event.headers
        const token = Authorization ? Authorization.split(' ')[1] : '';
        if (token) {
            const idUser = event.pathParameters.idUser;
            const getUserById= await userRepo.getUserById(idUser);
            const getScoreFromUser = await scoreRepo.getScoresByUser(idUser);
            if (!getScoreFromUser) {
                return utility.createResponse(false, null, 401, "User not existed");
            }
            let scoreList = [];
            for(var i=0; i< getScoreFromUser.length;i++)
            {
                scoreList[i]= getScoreFromUser[i];
            }
            const response ={
                user: getUserById,
                scoreList:scoreList,

            }
            return utility.createResponse(true, response, 200, "Success");
        }
        else {
            return utility.createResponse(false, null, 401, "UnAuthorization")
        }
    } catch (error) {
        console.log(error)
    }
}