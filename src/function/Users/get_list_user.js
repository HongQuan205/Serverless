const { userRepository } = require('repository')
const utility = require('utility')
const { code, message, format } = require('constant')
const moment = require('moment')

const getListUser = async (event) => {
    try {
        const queryString = event.queryStringParameters || {}
        const arrInput = ['account_status', 'siteIds', 'kyc_status', 'customer_rank']
        if ((queryString.tsFrom && !moment(queryString.tsFrom, format.DATE, true).isValid()) || (queryString.tsTo && !moment(queryString.tsTo, format.DATE, true).isValid())) {
            return utility.createResponse(false, null, code.error, message.server_error)
        }
        arrInput.forEach(element => {
            if (queryString[element]) {
                queryString[element] = queryString[element].split(",").filters(Number)
            }
        })
        const listUser =await userRepository.getListUser(pagination, queryString)
        if(!listUser)
        {
            return utility.createResponse(false,null, code.server_error,message.server_error)
        }
        return utility.createResponse(true, listUser)

    } catch (error) {
        console.log(error)
        return utility.createResponse(false, null, code.ERROR, message.server_error)
    }
}
module.exports = {
    getListUser
}