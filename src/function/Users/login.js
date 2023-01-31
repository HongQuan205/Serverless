// libary
const uuid = require('uuid')
const moment = require('moment')
const buffer = require('buffer')

const passwordHash = require('password-hash')
/* func && const */
const utitlity = require('utility')
const { message, code, arrLocale, accountStatus, flag } = require('constant')
const { userRepository } = require('repository')
const { template: tplMail, mailer } = require('helper')
const { createAccessHistory } = require('../History/user_access_history')

/* global */
const defaultId = -99
const defaultLang = 'ja'
const SUSPICIOUS_VALUE = [4, 5]

const login = async (event) => {
    try {
        const checkLogin = await checkBaseLogin(event)
        if (!checkLogin.status) {
            return utitlity.createResponse(false, null, code.ERROR, message.ERROR)
        }




    } catch (error) {
        console.log(error)
    }
}

const checkBaseLogin = async (event) => {
    try {
        const loginData = JSON.parse(event.body)
        const directIpAddress = event.requestContext.identity.sourceIp
        const directUserAgent = {
            userAgent: event.headers['User-Agent'],
            mobileDeviceType: event.headers.access_device_type,
            mobileDeviceName: event.headers.access_device_name
        }
        let typeLang = null
        if (loginData.locale && arrLocale.includes(loginData.locale)) {
            typeLang = loginData.locale
        }
        else {
            typeLang = defaultLang
        }

        // check input
        if (!loginData.recaptchaToken || !loginData.email || !loginData.password || !loginData.sessionId) {
            return {
                status: false,
                message: message.fields_cannot_blank
            }
        }

        // verify recaptcha
        // const responseRecaptcha = await utitlity.verifyRecaptcha(loginData.recaptchaToken)

        // if(!responseRecaptcha || !responseRecaptcha.success)
        // {
        //     await createAccessHistory(directIpAddress, directUserAgent, 0)
        //     return {
        //         status: false,
        //         message: message.captcha_is_not_verify
        //     }
        // }

        //check user
        const result = await userRepository.getUserByEmail(loginData.email)

        if (!result) {
            const userHash = defaultId + loginData.email
            const fraudAlert = await utitlity.verifyFraudAlert(userHash, loginData.sessionId, directIpAddress, directUserAgent.userAgent, false, false)
            console.log("so lan 1:",fraudAlert.relativeSuspiciousValue)
            await createAccessHistory(directIpAddress, directUserAgent, 0, fraudAlert)
            return {
                status: false,
                message: message.wrong_email_or_pass
            }
        }

        const userId = result.id
        const userHash = userId

        // if not correct password
        if (!passwordHash.verify(loginData.password, result.hashPassword)) {
            const fraudAlert = await utitlity.verifyFraudAlert(userHash, loginData.sessionId, directIpAddress, directUserAgent.userAgent, false, true)
            console.log("so lan 2:",fraudAlert.relativeSuspiciousValue)
            await createAccessHistory(directIpAddress, directUserAgent, 0, fraudAlert)
        }
        if (result.account_status === accountStatus.REGISTERED || result.is_locked === 1) {
            const fraudAlert = await utility.verifyFraudAlert(userHash, loginData.sessionId, directIpAddress, directUserAgent.userAgent, false)
            await createAccessHistory(directIpAddress, directUserAgent, 0, fraudAlert, userId)
        }


        // if user not actived
        if (result.account_status === accountStatus.REGISTERED) {
            return {
                status: false,
                message: message.account_is_not_active,
            }
        }

        // if user locked
        if (result.is_locked === flag.TRUE) {
            return {
                status: false,
                message: message.account_locked,
            }
        }
        const fraudAlert = await utitlity.checkOnlyFraudAlert(userHash, loginData.sessionId, directIpAddress, directUserAgent.userAgent)
        console.log("So lan 3:",fraudAlert.relativeSuspiciousValue)

        return true
    } catch (error) {
        console.error(error)
        return {
            status: false,
            message: message.wrong_email_or_pass
        }
    }

}

module.exports = {
    login
}