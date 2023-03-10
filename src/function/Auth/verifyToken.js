const jwt = require('jsonwebtoken')
require('dotenv').config();
const userRepository = require('repository').UserRepository
require('dotenv').config();
const message = require('constant').common

const verifyToken = async (event, context, callback) => {
    try {
        context.callbackWaitsForEmptyEventLoop = false
        let data = await verifyFuction(event);
        if (data.code === 200) {
            callback(null, data.result);
        }
        else if (data.code === 403) {
            callback(null, data.result);
        }
        else {
            callback(data.result);
        }
    } catch (error) {
        console.log(error);
        callback("UnAuthorization");
    }
}


const verifyFuction = async (event) => {
    const authorizationToken = event.authorizationToken;
    const jwtToken = authorizationToken ? authorizationToken.split(' ')[1] : '';

    const res = await jwt.verify(jwtToken, process.env.jwt_secret, async (err, decode) => {
        try {
            if (err) {
                return {
                    code: 401,
                    result: "Unauthorized"
                }
            }
            else {
                const checkTokenInDb = await userRepository.getTokenByUsername(decode.username);
                if (!checkTokenInDb) {
                    return {
                        code: 403,
                        result:
                        {
                            "principalId": decode.iat,
                            "policyDocument": {
                                "Version": "2012-10-17",
                                "Statement": [
                                    {
                                        "Action": "execute-api:Invoke",
                                        "Effect": "Deny",
                                        "Resource": event.methodArn
                                    }
                                ]
                            },
                            "context": {
                                message: "Token in not existed in database"
                            }
                        }
                    }
                }
                const validateToken = await jwt.verify(checkTokenInDb.token, process.env.jwt_secret, async (err) => {
                    if (err) {
                        return false;
                    }
                    else {
                        return true;
                    }
                })
                if (validateToken && checkTokenInDb.token !== jwtToken) {
                    return {
                        code: 403,
                        result: {
                            "principalId": decode.iat,
                            "policyDocument": {
                                "Version": "2012-10-17",
                                "Statement": [
                                    {
                                        "Action": "execute-api:Invoke",
                                        "Effect": "Deny",
                                        "Resource": event.methodArn
                                    }
                                ]
                            },
                            "context": {
                                message: "duplicated login"
                            }
                        }
                    }
                }
                return {
                    code: 200,
                    result: {
                        "principalId": decode.iat,
                        "policyDocument": {
                            "Version": "2012-10-17",
                            "Statement": [
                                {
                                    "Action": "execute-api:Invoke",
                                    "Effect": "Allow",
                                    "Resource": event.methodArn
                                }
                            ]
                        },
                        "context": {
                            "exampleKey": "Success"
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    })
    return res;
}
module.exports = {
    verifyToken
}