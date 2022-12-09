module.exports.message = Object.freeze({
  fields_cannot_blank: 'trans.fields_cannot_blank',
  fields_invalid: 'trans.fields_invalid',
  server_error: 'trans.server_error',
  duplicate_login: 'trans.duplicate_login',
  update_failed: 'trans.update_failed',
  access_token_invalid: 'trans.access_token_invalid',
  please_check_otp_sms: 'trans.please_check_otp_sms',
  account_locked: 'trans.account_locked',
  please_check_mail_confirm: 'trans.please_check_mail_confirm',
  wrong_email_or_pass: 'trans.wrong_email_or_pass',
  captcha_is_not_verify: 'trans.captcha_is_not_verify',
  account_is_not_active: 'trans.account_is_not_active',
  phone_number_exist: 'trans.phone_number_exist',
  email_exist: 'trans.email_exist',
  user_name_exist: 'trans.user_name_exist',
  wrong_code: 'trans.wrong_code',
  code_expire: 'trans.code_expire',
  wrong_phone_number: 'trans.wrong_phone_number',
  link_expired: 'trans.link_expired',
  send_mail_error: 'trans.send_mail_error',
  not_exist_account_sns: 'trans.not_exist_account_sns',
  not_exist_email: 'trans.not_exist_email',
})

module.exports.flag = Object.freeze({
  TRUE: 1,
  FALSE: 0,
})

module.exports.code = Object.freeze({
  SUCCESS: 200,
  ERROR: 500,
  INVALID: 402,
  VALIDATOR: 422,
  AUTHORIZATION: 401,
})

module.exports.format = Object.freeze({
  DATE: 'YYYY-MM-DD',
  DATE_TIME: 'YYYY-MM-DD HH:mm:ss',
  DATE_TIME_ZONE: 'YYYY-MM-DDTHH:mm:ssZ',
})

module.exports.siteId = 1

module.exports.arrLocale = ['ja', 'kr', 'en', 'cn']

module.exports.loginBase = Object.freeze({
  PASS: 1,
  NOT_PASS: 0,
})

module.exports.twoFactorAuthentication = Object.freeze({
  PASSWORD: 1,
  SMS: 2,
  APP: 3,
})

module.exports.category = Object.freeze({
  EMAIL_RECEPTION_SETTING: 1,
  DISPLAY_SETTING: 2,
  SECURITY_INFORMATION: 3,
  SOCIAL_LOGIN_SETTING: 4,
  BASIC_INFORMATION_PERSON_OR_CORPORATE: 5,
})

module.exports.contentUpdate = Object.freeze({
  // EMAIL_RECEPTION_SETTING
  NOTIFICATION_FROM_SITE: 1,
  MONTHLY_USAGE_REPORT: 2,
  MARKET_ANALYSIS_FUTURE_FORECAST: 3,
  DAILY_CONFIRMATION_MONTHLY_STATEMENT: 4,

  // DISPLAY_SETTING
  DISPLAY_LANGUAGE: 1,
  DISPLAY_LANGUAGE_MAIL: 2,
  DISPLAY_DATE_TIME_FORMAT: 3,
  DISPLAY_TIMEZONE: 4,

  // SECURITY_INFORMATION
  PHONE_NUMBER: 1,
  LOGIN_PASSWORD: 2,
  EMAIL_ADDRESS: 3,
  NOTIFICATION_UNUSUAL_LOGIN: 4,
  TWO_FA_METHOD: 5,

  // SOCIAL_LOGIN_SETTING
  GOOGLE_SSO_LOGIN: 1,
  TWITTER_ID_LOGIN: 2,
  FACEBOOK_ID_LOGIN: 3,

  // BASIC_INFORMATION_PERSON_OR_CORPORATE
  CHANGE_PROFILE_PICTURE: 1,
})

module.exports.suspiciousLevel = Object.freeze({
  HIGH: [0, 1, 2],
  MIDDLE: [3],
  LOW: [4, 5],
})

module.exports.notifyUnusualLogin = Object.freeze({
  SMS: 1,
  EMAIL: 2,
})

module.exports.verifyToken = Object.freeze({
  PASS: 1,
  NOT_PASS: 0,
})

module.exports.accountStatus = Object.freeze({
  REGISTERED: 1,
  ACTIVATED: 2,
  APPROVED: 3,
  CLOSED: 4,
})

module.exports.keySplitUrl = 'dvt0@nop$8e'
module.exports.passwordDisplay = '*******'

module.exports.accountStatus = Object.freeze({
  REGISTERED: 1,
  ACTIVATED: 2,
  APPROVED: 3,
  CLOSED: 4,
})
