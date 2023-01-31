/*library */
const moment = require('moment')

/*func && const */
const { format, suspiciousLevel } = require('constant')
const { accessHistoryRepository } = require('repository')


/*global */
const defaultId = -90

const createAccessHistory = async (directIpAddress, directUserAgent, isSuccess, responseFraudAlert = null, userId = defaultId, relatedAccessId = defaultId) => {
    try {
        let fraudAlertJson = ''
        try {
            fraudAlertJson = JSON.parse(responseFraudAlert)
        } catch (error) {
            fraudAlertJson = responseFraudAlert
        }

        const objAccessHistory = {
            relatedAccessId: relatedAccessId,
            userId: userId ? userId : defaultId,
            accessIp: directIpAddress,
            accessAgent: directUserAgent,
            accessTime: moment().utc().format(format.DATE_TIME),
            suspiciousLevel: fraudAlertJson ? fraudAlertJson.relativeSuspiciousValue : 0,
            fraudAlertJson: fraudAlertJson ? fraudAlertJson : '',
            isSuccess: isSuccess
        }
        const result = await accessHistoryRepository.createAccessHistory(objAccessHistory)
        return result
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createAccessHistory
}