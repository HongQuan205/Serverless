/* DB */
const {db} = require('db')

/* constant */
const { siteId, suspiciousLevel, flag, format } = require('constant')

/*function */
const utility = require('utility')

/* library */
const parser = require('ua-parser-js')

const moment = require('moment')

async function createAccessHistory(obj) {
    const location = await utility.getLocationByIp(obj.accessIp)
    const mapDeviceType = {
        console: 'console',
        desktop: 'desktop',
        mobile: 'smartphone',
        tablet: 'phablet',
        smarttv: 'smarttv',
        wearable: 'wearable',
        embedded: 'embedded',
        undefined: null,
    }
    let deviceType
    let deviceBrower
    if (obj.accessAgent.mobileDeviceType && obj.accessAgent.mobileDeviceName) {
        deviceType = obj.accessAgent.mobileDeviceType
        deviceBrower = obj.accessAgent.mobileDeviceName
    } else {
        const { browser, os, device } = parser(obj.accessAgent.userAgent)
        const isIpad = (obj.accessAgent.userAgent.indexOf('iPad') > -1 || obj.accessAgent.userAgent.indexOf('Macintosh') > -1)
        deviceType = (isIpad ? 'tablet' : device.type) || (os.name ? 'desktop' : null)
        const osType = deviceType === 'desktop' ? 'PC' : (isIpad ? 'iPad' : os.name)
        deviceBrower = [[device.model, osType].find(Boolean), browser.name].filter(Boolean).join('/') || null
    }

    const accessHistory = {
        related_access_id: obj.relatedAccessId,
        user_id: obj.userId,
        site_id: siteId,
        access_ip: obj.accessIp,
        access_country: location ? location.countryCode : null,
        access_agent: obj.accessAgent,
        access_device_brower: deviceBrower,
        access_device_type: obj.accessAgent.mobileDeviceType ? deviceType : mapDeviceType[deviceType] || null,
        access_time: obj.accessTime,
        suspicious_level: obj.suspiciousLevel,
        fraud_alert_json: obj.fraudAlertJson ? JSON.stringify(obj.fraudAlertJson) : '',
        is_success: obj.isSuccess,
    }

    try {
        const result = await db('user_access_history').insert(accessHistory)
        return { status: true, data: result[0], deviceBrower }
    } catch (error) {
        console.error(error)
        return { status: false }
    }
}

module.exports = {
    createAccessHistory
}