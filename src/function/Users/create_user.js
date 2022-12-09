'use strcit'

//  constant
const { message, code, siteId, arrLocale, accountStatus, format, lang } = require('constant')
const defaultTimezone = 65

// function
const utility = require('utility')

// library
const moment = require('moment')
const generator = require('generate-password')
const passwordHash = require('password-hash')
const uuid = require('uuid')
const defaultTimeZone = 65 
// DB
const { userRepository } = require('repository')

const createUser = async (event) => {
    try {
        const eventBody = JSON.parse(event.body)
        let typeLang = arrLocale.includes(eventBody.locale) ? eventBody.locale : defaultTimezone
        let timeZone = eventBody.timeZone ? eventBody.timeZone : defaultTimeZone

        //  check locale
        if (!eventBody.countryId
            || !eventBody.recaptchaToken
            || !eventBody.phoneNumberCountryId
            || !eventBody.phoneNumber
            || !eventBody.email
            || !eventBody.user_name
            || !eventBody.password) {
            return utility.createResponse(false, null, code.ERROR, message.fields_cannot_blank)
        }

        //verify recaptcha
        const jsonRecaptcha = await utility.verifyRecaptcha(eventBody.recaptchaToken)
        console.log(jsonRecaptcha)
        if (!jsonRecaptcha || !jsonRecaptcha.success) {
            return utility.createResponse(false, null, code.ERROR, message.captcha_is_not_verify)
        }

        let userForm = {
            country_id: eventBody.countryId,
            phone_number_country_id: eventBody.phoneNumberCountryId,
            phone_number: eventBody.phoneNumber,
            email: eventBody.email,
            user_name: eventBody.user_name,
            activation_key: uuid.v4(),
            activation_expire: moment().utc().add(1, 'hours').format(format.DATE_TIME),
            account_status: accountStatus.REGISTERED,
            site_id: siteId,
            member_id: generator.generate({ length: 6, numbers: true, uppercase: false }),
        }

        if (eventBody.password) {
            userForm.hash_password = passwordHash.generate(eventBody.password)
        }

        //data create user-setting

        const userSettingForm = {
            site_id: siteId,
            language_portal: typeLang,
            language_email: typeLang,
            display_date_time: 1,
            display_time_zone: timeZone,
        }

        const hasUserExistByEmail = await userRepository.checkFieldExist({ fieldName: 'email', fieldValue: userForm.email })

        const hasUserExistByPhoneNumber = await userRepository.checkFieldExist({ fieldName: 'phone_number', fieldValue: userForm.phone_number })

        // check phone number exist system
        if (hasUserExistByPhoneNumber) {
            return utility.createResponse(false, null, code.ERROR, message.phone_number_exist)
        }
        // check email exist system
        if (hasUserExistByEmail) {
            return utility.createResponse(false, null, code.ERROR, message.email_exist)
        }

        const result = await userRepository.createUser(
            userForm,
            userSettingForm,
            typeLang,
        )
        if (!result) {
            return utility.createResponse(false, null, code.ERROR, message.server_error)
        }
        return utility.createResponse(true, message.please_check_mail_confirm)
    } catch (error) {
        console.error(error)
        return utility.createResponse( false, null, code.ERROR, message.server_error )
    }
}

module.exports = {
    createUser
}