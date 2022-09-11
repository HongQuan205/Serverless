
'use strict'

const userRepo = require('../repository/UserRepository')
const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')
require('dotenv').config();
module.exports.getUserById = async (event) => {
    try {
        const { Authorization } = event.headers;
        const jwttoken = Authorization ? Authorization.split(' ')[1] : '';
        const { userId, username } = jwt.verify(jwttoken, process.env.jwt_secret);
        if (jwttoken) {
            let id = event.pathParameters.id;
            let user = await userRepo.getUserById(id)
            if (user == null) {
                return {
                    statusCode: 500,
                    body: JSON.stringify(
                        {
                            message: "Get User fail",
                            data: null,
                        }
                    )
                }
            }
            return {
                statusCode: 200,
                body: JSON.stringify(
                    {
                        message: "Get User Successfully",
                        data: user
                    }
                ),
            }
        }
        else {
            return {
                statusCode: 401,
                body: JSON.stringify(
                    {
                        message: "UnAuthorization",
                        code: 401
                    }
                )
            }
        }
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            body: JSON.stringify(
                {
                    message: "Error Internal",
                    code: 401
                }
            )
        }
    }
}


module.exports.createUser = async (event) => {
    try {
        const { Authorization } = event.headers;
        const jwttoken = Authorization ? Authorization.split(' ')[1] : '';
        const { userId } = jwt.verify(jwttoken, process.env.jwt_secret);
        if (jwttoken) {
            const eventBody = JSON.parse(event.body);
            const { name, age, phone_number, address, username, password } = eventBody;
            if (!name || !age || !phone_number || !address || !username || !password) {
                return {
                    statusCode: 500,
                    body: JSON.stringify({
                        message: " Error in Internal",
                        code: "500"
                    })
                }
            }
            const createUser = {
                name: eventBody.name,
                age: eventBody.age,
                phone_number: eventBody.phone_number,
                address: eventBody.address,
                username: eventBody.username,
                password: passwordHash.generate(eventBody.password),
            }
            let user = await userRepo.createUser(createUser);
            if (user == null) {
                return {
                    statusCode: 500,
                    body: JSON.stringify(
                        {
                            message: "Get User fail",
                            data: null,
                        }
                    )
                }
            }
            return {
                statusCode: 200,
                body: JSON.stringify(
                    {
                        message: "Create User Successfully",
                        data: user,
                    }
                )
            }
        }
        else {
            return {
                statusCode: 401,
                body: JSON.stringify(
                    {
                        message: "UnAuthorization",
                        code: 401
                    }
                )
            }
        }
    } catch (error) {
        console.log("Error occur", error)
    }
}



module.exports.deleteUser = async (event) => {
    try {
        const eventBody = JSON.parse(event.body);
        const deleteUser = await userRepo.deleteUser(eventBody.id);
        if (deleteUser == null) {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    message: "delete user fail",
                    code: 500,
                })
            }
        }
        return {
            statusCode: 200,
            body: JSON.stringify(
                {
                    message: "delete user successfully",
                    data: deleteUser
                }
            )
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.updateUser = async (event) => {
    try {
        const eventBody = JSON.parse(event.body);
        const updateUser = await userRepo.updateUser(eventBody);
        if (updateUser == null) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "update User fail",
                    code: 500,
                })
            }
        }
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "update user successfully",
                data: updateUser
            })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports.login = async (event) => {
    try {
        console.log(process.env.jwt_secret);
        const { username, password } = JSON.parse(event.body);
        const getUserFromUsername = await userRepo.getUserByUsername(username);
        console.log(passwordHash.verify(password, getUserFromUsername.password));
        if (!passwordHash.verify(password, getUserFromUsername.password)) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: "password is incorrect",
                    code: 404,
                })
            }
        }
        let token = jwt.sign(
            {
                userId: getUserFromUsername.id,
                username: getUserFromUsername.username,
            }, process.env.jwt_secret,
            {
                expiresIn: process.env.jwt_expire_in
            }
        )
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Login success fully",
                username: getUserFromUsername.username,
                token: token,
            })
        }
    } catch (error) {
        console.log(error)
    }

}