'user strict'
const userRepo = require('../repository/UserRepository')
const passwordHash = require('password-hash')

module.exports.getUserById = async (event) => {
    try {
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
    } catch (error) {
        console.log(error)
    }
}


module.exports.createUser = async (event) => {
    try {
        const eventBody = JSON.parse(event.body);
        const { name,age,phone_number,address,username,password } = eventBody;
        if(!name || !age || !phone_number || !address || !username || !password)
        {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    message:" Error in Internal",
                    code:"500"
                })
            }
        }
        const createUser = {
            name: eventBody.name,
            age: eventBody.age,
            phone_number: eventBody.phone_number,
            address: eventBody.address,
            username:eventBody.username,
            password:passwordHash.generate(eventBody.password),
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

