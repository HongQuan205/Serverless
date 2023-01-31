
const jwt = require('jsonwebtoken')
const { code, message } = require('constant')
const qs = require('qs')
const axios  = require('helper')

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

module.exports = {
    createResponse,
    createToken,
    verifyRecaptcha,
}