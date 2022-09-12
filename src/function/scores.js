'use strict'

require('dotenv').config();
const scoreRepo = require('../repository/ScoresRepository')
const utility = require('../layer/utility')
module.exports.getAllScoreFromUser = async (event) => {
    try {
        const { Authorization } = event.headers
        const token = Authorization ? Authorization.split(' ')[1] : '';
        if (token) {
            const idUser = event.pathParameters.idUser;
            const getScoreFromUser = await scoreRepo.getScoresByUser(idUser);
            if (!getScoreFromUser) {
                return utility.createResponse(false, null, 401, "User not existed");
            }
            return utility.createResponse(true, getScoreFromUser, 200, "Success");
        }
        else {
            return utility.createResponse(false, null, 401, "UnAuthorization")
        }
    } catch (error) {
        console.log(error)
    }
}