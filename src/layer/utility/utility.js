
const jwt = require('jsonwebtoken')
const { code, message } = require('constant')
const qs = require('qs')
const {axios}  = require('helper')
const siteId = process.env.SITE_ID
const API_KEY = process.env.API_KEY
const createResponse = (isSuccess = true, data = {}, code, message) => {
    const response = {};
    if (isSuccess) {
        response['status'] = 'success',
            response['data'] = data
    } else if (message) {
        response['status'] = 'error',
            response['message'] = message
        if (code) {
            response['code'] = code;
        }
        if (data) {
            response['data'] = data;
        }
    } else {
        response['status'] = 'fail',
            response['data'] = data
    }
    return {
        statusCode: isSuccess ? 200 : 500,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(response)
    }
}

const fetchAPI = async (url, objForm) =>{
    try {
        const res = await axios({
            url,
            method: 'POST',
            data:qs.stringify(objForm)
        })
        return res
    } catch (error) {
        console.error(error)
        return createResponse(false, null, code.ERROR, error.message)
    }
}

const createToken = (data) => {
    if (data) {
        let token = jwt.sign(
            {
                userId: data.id,
                username: data.username,
            }, process.env.jwt_secret,
            {
                expiresIn: process.env.jwt_expire_in
            }
        )
        return token;
    }
    else {
        return null;
    }

}

const verifyRecaptcha = (recaptchaToken) => {
    const url = 'https://www.google.com/recaptcha/api/siteverify'
    const form = {
        secret: process.env.SECRET_KEY_RECAPTCHA,
        response: recaptchaToken,
    }

    return fetchAPI(url, form)
}

const verifyFraudAlert = (userId, sessionId, directIpAddress, directUserAgent, isSuccess = true, isRegistered = true) => {
    const url = `https://stcapi.fraud-alert.net/c/${isSuccess ? 'loginSucceed' : 'loginFailed'}`
    let form = {
      siteId: siteId,
      sessionId: sessionId,
      userHash: userId,
      verboseAuthentication: true,
      apiKey: API_KEY,
      directIpAddress: directIpAddress,
      directUserAgent: directUserAgent,
    }
    if (!isSuccess) {
      form = {
        ...form,
        registeredUser: isRegistered,
      }
    }
  
    return fetchAPI(url, form)
  }

  const getLocationByIp = async (ipAddress) =>{
    try {
        const url = `https://pro.ip-api.com/json/${ipAddress}?key=${process.env.API_KEY_IP}`
        const res = await axios({
            url,
            method: 'GET'
        })
        if(res?.status === 'fail')
        {
            return null
        }
        return res
    } catch (error) {
        console.log(error)
        return null
    }
  }
  
  const checkOnlyFraudAlert = (userHash, sessionId, directIpAddress, directUserAgent) =>{
    const url = 'https://stcapi.fraud-alert.net/c/checkOnly'
    const form = {
        siteId: siteId,
        sessionId: sessionId,
        userHash: userHash,
        verboseAuthentication: true,
        apiKey: API_KEY,
        directIpAddress: directIpAddress,
        directUserAgent: directUserAgent,
      }
    
      return fetchAPI(url, form)
  }
  const escapeSql = (term) => {
    return (term || '').toLowerCase().replace('%', '\\%').replace('_', '\\_')
  }

  const getPagination = (obj) => {
    const objParam = obj || {}
    const sort = objParam.sort || 'id,DESC'
    const sortArr = [
      {
        column: sort.split(',')[0],
        order: sort.split(',').length > 1 ? sort.split(',')[1] : 'DESC',
      },
    ]
    const pagination = {
      currentPage: objParam.page || 1,
      perPage: (objParam.size && objParam.size >= 1) ? objParam.size : 20,
      sort: sortArr,
      isLengthAware: true,
    }
    return pagination
  }
  
module.exports = {
    createResponse,
    createToken,
    verifyRecaptcha,
    verifyFraudAlert,
    getLocationByIp,
    checkOnlyFraudAlert,
    escapeSql,
    getPagination
}