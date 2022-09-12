
const jwt = require('jsonwebtoken')


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
module.exports = {
    createResponse, createToken
}