module.exports.message = Object.freeze({
    fields_cannot_blank: 'trans.fields_cannot_blank',
    wrong_email_or_pass: 'trans.wrong_email_or_pass',
    server_error: 'trans.server_error',
    access_token_invalid: 'trans.access_token_invalid',
    captcha_is_not_verify: 'trans.captcha_is_not_verify',
    please_check_mail_confirm: 'trans.please_check_mail_confirm',
    send_mail_error: 'trans.send_mail_error',
    password_change_success: 'trans.password_change_success',
    delete_success: 'trans.delete_success',
    invalid_reset_key: 'trans.invalid_reset_key',
    token_invalid: 'trans.token_invalid',
    update_account_success: 'trans.update_account_success',
    create_account_success: 'trans.create_account_success',
    update_status_success: 'trans.update_status_success',
    email_exist_in_system: 'trans.email_exist_in_system',
    create_account_fail: 'trans.create_account_fail',
    update_account_fail: 'trans.update_account_fail',
    link_expired: 'trans.link_expired',
    account_is_not_active: 'trans.account_is_not_active',
    not_exist_email: 'trans.not_exist_email',
    server_validator: 'trans.server_validator',
    check_resetKey_success: 'trans.check_resetKey_success',
    duplicate_login: 'trans.duplicate_login',
    phone_number_exist: 'trans.phone_number_exist',
    check_phone_number_success: 'trans.check_phone_number_success',
    check_email_success: 'trans.check_email_success',
    account_locked: 'trans.account_locked',
    not_exist_account_sns: 'trans.not_exist_account_sns',
    send_mail_success: 'trans.send_mail_success',
    fields_invalid: 'trans.fields_invalid',
    pending_2fa: 'trans.pending_2fa',
    setting_password_wrong: 'trans.setting_password_wrong',
    setting_password_pending: 'trans.setting_password_pending',
    setting_phone_number_2fa_sms: 'trans.setting_phone_number_2fa_sms',
    fields_invalid: 'trans.fields_invalid',
    account_sns_exist: 'trans.account_sns_exist',
    please_check_otp_sms: 'trans.please_check_otp_sms',
    wrong_token_app: 'trans.wrong_token_app',
    security_twofa_pending: 'trans.security_twofa_pending',
    security_twofa_fail: 'trans.security_twofa_fail',
    release_2fa_pending: 'trans.release_2fa_pending',
    release_code_email_expire: 'trans.release_code_email_expire',
    release_code_email_wrong: 'trans.release_code_email_wrong',
    release_code_sms_wrong: 'trans.release_code_sms_wrong',
    wrong_phone_number: 'trans.wrong_phone_number',
    wrong_code: 'trans.wrong_code',
    code_expire: 'trans.code_expire',
    user_existed:"User is existed",
    user_not_existed:"User is not existed"
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
  
  module.exports.dataStatus = Object.freeze({
    EXIST_MAIL: 'EXIST_MAIL',
    EXIST_PHONE_NUMBER: 'EXIST_PHONE_NUMBER',
    COMPLETE: 'COMPLETE',
    FAIL: 'FAIL',
    IS_EXPIRED: 'IS_EXPIRED',
    ACCOUNT_INACTIVE: 'ACCOUNT_INACTIVE',
    DUPLICATE_LOGIN: 'DUPLICATE_LOGIN',
  })
  
  module.exports.format = Object.freeze({
    DATE: 'YYYY-MM-DD',
    DATE_TIME: 'YYYY-MM-DD HH:mm:ss',
    DATE_TIME_ZONE: 'YYYY-MM-DDTHH:mm:ssZ',
  })
  
  module.exports.siteId = 3
  
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
    INFORMATION_OCCUPATIONS_AND_TRANSACTIONS: 6,
    INVESTOR_INFORMATION: 7,
    REPRESENTATIVE_INFORMATION: 8,
    TRANSACTION_INFORMATION: 9,
    BENEFICIAL_OWNER_INFORMATION: 10,
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
    PROFILE_REGISTRATION: 2,
    CHANGE_NATIONALITY: 3,
    CHANGE_COUNTRY_RESIDENCE_CORPORATE: 4,
    CHANGE_FIRST_NAME_ROMAJI: 5,
    CHANGE_LAST_NAME_ROMAJI: 6,
    CHANGE_FIRST_NAME_KANJI: 7,
    CHANGE_LAST_NAME_KANJI: 8,
    CHANGE_FIRST_NAME_KATAKANA: 9,
    CHANGE_LAST_NAME_KATAKANA: 10,
    CHANGE_CORPORATE_NAME_REGISTERED: 11,
    CHANGE_CORPORATE_NAME_ENGLISH: 12,
    CHANGE_CORPORATE_NAME_KATAKANA: 13,
    CHANGE_GENDER: 14,
    CHANGE_DATE_OF_BIRTH: 15,
    CHANGE_DATE_OF_ESTABLISHMENT: 16,
    CHANGE_COUNTRY_RESIDENCE_PERSONAL: 17,
    CHANGE_ZIP_POSTAL_CODE_JA: 18,
    CHANGE_PREFECTURE_JA: 19,
    CHANGE_CITY_JA: 20,
    CHANGE_ADDRESS_JA: 21,
    CHANGE_BUILDING: 22,
    CHANGE_ZIP_POSTAL_CODE: 23,
    CHANGE_STATE_PROVINCE: 24,
    CHANGE_CITY: 25,
    CHANGE_ADDRESS_LINE1: 26,
    CHANGE_ADDRESS_LINE2: 27,
    CHANGE_CORPORATE_PHONE_NUMBER: 28,
    CHANGE_WEBSITE_URL: 29,
    CHANGE_INDUSTRY_CORPOTATE: 30,
    CHANGE_BUSINESS_CONTENT: 31,
    CHANGE_US_TAX_OBLIGATIONS: 32,
    CHANGE_US_TAXPAYER: 33,
  
    // INFORMATION_OCCUPATIONS_AND_TRANSACTIONS
    CHANGE_OCCUPATIONAL_FORM_ICPAY: 1,
    CHANGE_FUNDING_SOURCE_ICPAY: 2,
    CHANGE_INDUSTRY_ICPAY: 3,
    CHANGE_PURPOSE_OF_USE_ICPAY: 4,
    CHANGE_ESTIMATED_ANNUAL_USAGE_AMOUNT_ICPAY: 5,
  
    // INVESTOR_INFORMATION
    CHANGE_OCCUPATIONAL_FORM_FXT: 1,
    CHANGE_FUNDING_SOURCE_FXT: 2,
    CHANGE_INDUSTRY_FXT: 3,
    CHANGE_ANNUAL_INCOME_FXT: 4,
    CHANGE_COMPANY_ANNUAL_SALES_FXT: 5,
    CHANGE_NET_WORTH_FXT: 6,
    CHANGE_PLANNED_ANNUAL_INVESTMENT_FXT: 7,
    CHANGE_PURPOSE_OF_INVESTMENT_FXT: 8,
  
    // REPRESENTATIVE_INFORMATION
    CHANGE_NATIONALITY_REPRESENTATIVE: 1,
    CHANGE_FIRST_NAME_ROMAJI_REPRESENTATIVE: 2,
    CHANGE_LAST_NAME_ROMAJI_REPRESENTATIVE: 3,
    CHANGE_FIRST_NAME_KANJI_REPRESENTATIVE: 4,
    CHANGE_LAST_NAME_KANJI_REPRESENTATIVE: 5,
    CHANGE_FIRST_NAME_KATAKANA_REPRESENTATIVE: 6,
    CHANGE_LAST_NAME_KATAKANA_REPRESENTATIVE: 7,
    CHANGE_GENDER_REPRESENTATIVE: 8,
    CHANGE_DATE_OF_BIRTH_REPRESENTATIVE: 9,
    CHANGE_COUNTRY_RESIDENCE_REPRESENTATIVE: 10,
    CHANGE_ZIP_POSTAL_CODE_JA_REPRESENTATIVE: 11,
    CHANGE_PREFECTURE_JA_REPRESENTATIVE: 12,
    CHANGE_CITY_JA_REPRESENTATIVE: 13,
    CHANGE_ADDRESS_JA_REPRESENTATIVE: 14,
    CHANGE_BUILDING_REPRESENTATIVE: 15,
    CHANGE_ZIP_POSTAL_CODE_REPRESENTATIVE: 16,
    CHANGE_STATE_PROVINCE_REPRESENTATIVE: 17,
    CHANGE_CITY_REPRESENTATIVE: 18,
    CHANGE_ADDRESS_LINE1_REPRESENTATIVE: 19,
    CHANGE_ADDRESS_LINE2_REPRESENTATIVE: 20,
    CHANGE_CONTACT_PHONE_NUMBER_REPRESENTATIVE: 21,
    CHANGE_US_TAX_OBLIGATIONS_REPRESENTATIVE: 22,
    CHANGE_US_TAXPAYER_REPRESENTATIVE: 23,
  
    // TRANSACTION_INFORMATION
    CHANGE_NATIONALITY_TRANSACTION: 1,
    CHANGE_FIRST_NAME_ROMAJI_TRANSACTION: 2,
    CHANGE_LAST_NAME_ROMAJI_TRANSACTION: 3,
    CHANGE_FIRST_NAME_KANJI_TRANSACTION: 4,
    CHANGE_LAST_NAME_KANJI_TRANSACTION: 5,
    CHANGE_FIRST_NAME_KATAKANA_TRANSACTION: 6,
    CHANGE_LAST_NAME_KATAKANA_TRANSACTION: 7,
    CHANGE_GENDER_TRANSACTION: 8,
    CHANGE_DATE_OF_BIRTH_TRANSACTION: 9,
    CHANGE_COUNTRY_RESIDENCE_TRANSACTION: 10,
    CHANGE_ZIP_POSTAL_CODE_JA_TRANSACTION: 11,
    CHANGE_PREFECTURE_JA_TRANSACTION: 12,
    CHANGE_CITY_JA_TRANSACTION: 13,
    CHANGE_ADDRESS_JA_TRANSACTION: 14,
    CHANGE_BUILDING_TRANSACTION: 15,
    CHANGE_ZIP_POSTAL_CODE_TRANSACTION: 16,
    CHANGE_STATE_PROVINCE_TRANSACTION: 17,
    CHANGE_CITY_TRANSACTION: 18,
    CHANGE_ADDRESS_LINE1_TRANSACTION: 19,
    CHANGE_ADDRESS_LINE2_TRANSACTION: 20,
    CHANGE_US_TAX_OBLIGATIONS_TRANSACTION: 21,
    CHANGE_US_TAXPAYER_TRANSACTION: 22,
  
    // BENEFICIAL_OWNER_INFORMATION
    CHANGE_CORPORATE_FORM_BENEFICIAL_OWNER: 1,
    CHANGE_NUMBER_BENEFICIAL_OWNER_PERSONAL: 2,
    CHANGE_NUMBER_BENEFICIAL_OWNER_CORPORATE: 3,
    CHANGE_NATIONALITY_BENEFICIAL_OWNER: 4,
    CHANGE_COUNTRY_RESIDENCE_CORPORATE_BENEFICIAL_OWNER: 5,
    CHANGE_FIRST_NAME_ROMAJI_BENEFICIAL_OWNER: 6,
    CHANGE_LAST_NAME_ROMAJI_BENEFICIAL_OWNER: 7,
    CHANGE_FIRST_NAME_KANJI_BENEFICIAL_OWNER: 8,
    CHANGE_LAST_NAME_KANJI_BENEFICIAL_OWNER: 9,
    CHANGE_FIRST_NAME_KATAKANA_BENEFICIAL_OWNER: 10,
    CHANGE_LAST_NAME_KATAKANA_BENEFICIAL_OWNER: 11,
    CHANGE_CORPORATE_NAME_REGISTERED_BENEFICIAL_OWNER: 12,
    CHANGE_CORPORATE_NAME_ENGLISH_BENEFICIAL_OWNER: 13,
    CHANGE_CORPORATE_NAME_KATAKANA_BENEFICIAL_OWNER: 14,
    CHANGE_GENDER_BENEFICIAL_OWNER: 15,
    CHANGE_DATE_OF_BIRTH_BENEFICIAL_OWNER: 16,
    CHANGE_DATE_OF_ESTABLISHMENT_BENEFICIAL_OWNER: 17,
    CHANGE_COUNTRY_RESIDENCE_PERSONAL_BENEFICIAL_OWNER: 18,
    CHANGE_ZIP_POSTAL_CODE_JA_BENEFICIAL_OWNER: 19,
    CHANGE_PREFECTURE_JA_BENEFICIAL_OWNER: 20,
    CHANGE_CITY_JA_BENEFICIAL_OWNER: 21,
    CHANGE_ADDRESS_JA_BENEFICIAL_OWNER: 22,
    CHANGE_BUILDING_BENEFICIAL_OWNER: 23,
    CHANGE_ZIP_POSTAL_CODE_BENEFICIAL_OWNER: 24,
    CHANGE_STATE_PROVINCE_BENEFICIAL_OWNER: 25,
    CHANGE_CITY_BENEFICIAL_OWNER: 26,
    CHANGE_ADDRESS_LINE1_BENEFICIAL_OWNER: 27,
    CHANGE_ADDRESS_LINE2_BENEFICIAL_OWNER: 28,
    CHANGE_CONTACT_PESONAL_PHONE_NUMBER_BENEFICIAL_OWNER: 29,
    CHANGE_CONTACT_CORPORATE_PHONE_NUMBER_BENEFICIAL_OWNER: 30,
    CHANGE_INDUSTRY_BENEFICIAL_OWNER: 31,
    CHANGE_BUSINESS_CONTENT_BENEFICIAL_OWNER: 32,
    CHANGE_WEBSITE_URL_BENEFICIAL_OWNER: 33,
    CHANGE_VOTING_RIGHTS_RATIO_BENEFICIAL_OWNER: 34,
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
  
  module.exports.keySplitUrl = '1vh0@ng$8k'
  module.exports.passwordDisplay = '*******'
  
  module.exports.accountStatus = Object.freeze({
    REGISTERED: 1,
    ACTIVATED: 2,
    APPROVED: 3,
    CLOSED: 4,
  })
  
  module.exports.profileStatus = Object.freeze({
    UNREGISTER: 1,
    WAITING_APPROVED: 2,
    REGIST_APPROVED: 3,
    UPDATE_APPROVED: 4,
  })
  
  module.exports.messageId = Object.freeze({
    UNREGISTER: 5,
    WAITING_APPROVED: 6,
    REGIST_APPROVED: 7,
    UPDATE_APPROVED: 8,
  })
  
  module.exports.kycStatus = Object.freeze({
    UNSUBMITTED: 1,
    ACTION_REQUIRED: 2,
    PENDING_APPROVED: 3,
    APPROVED: 4,
    DEFICIENCY: 5,
    EXPIRED: 6,
  })
  
  module.exports.financeInfo = Object.freeze({
    OCCUPATIONS: 'occupations',
    FUNDING_SOURCES: 'funding_sources',
    INDUSTRIES: 'industries',
    MONEY_RANGE_PERSON_FXT: 'money_range_person_fxt',
    MONEY_RANGE_COMPANY_FXT: 'money_range_company_fxt',
    MONEY_RANGE_COMPANY_ICPAY: 'money_range_company_icpay',
    INVESTMENT_PURPOSE: 'investment_purpose',
    USING_PURPOSE: 'using_purpose',
  })
  
  module.exports.country = Object.freeze({
    CHINA: 46,
    JAPAN: 113,
    KOREA: 120,
    UK: 235,
  })
  