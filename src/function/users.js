'use strict'

const userRepo = require('../repository/UserRepository')
const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')
const utility = require('../layer/utility')
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
                return utility.createResponse(false, null, 400, "Get Fail User")
            }
            return utility.createResponse(true, user, 200, "Get User Successfully");
        }
        else {
            return utility.createResponse(false, null, 401, "UnAuthorization")
        }
    } catch (error) {
        console.log(error);
        return utility.createResponse(false, null, 401, "UnAuthorization")
    }
}


module.exports.createUser = async (event) => {
    try {
        const { Authorization } = event.headers;
        const jwttoken = Authorization ? Authorization.split(' ')[1] : '';
        if (jwttoken) {
            const { userId } = jwt.verify(jwttoken, process.env.jwt_secret);
            const eventBody = JSON.parse(event.body);
            const { name, age, phone_number, address, username, password } = eventBody;
            if (!name || !age || !phone_number || !address || !username || !password) {
                return utility.createResponse(false, null, 500, "Error in Internal");
            }
            const checkUserInDb = await userRepo.getUserByUsername(username);
            if(checkUserInDb.username === username)
            {
                return utility.createResponse(false,null,500, "User is existed");
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
                return utility.createResponse(false, null, 500, "Get Fail User");

            }
            return utility.createResponse(true, user, 200, "Create User Successfully");
        }
        else {
            return utility.createResponse(false, null, 401, "UnAuthorization");
        }
    } catch (error) {
        console.log(error)
        return utility.createResponse(false, null, 401, "UnAuthorization")
    }
}



module.exports.deleteUser = async (event) => {
    try {
        const { Authorization } = event.headers;
        const jwttoken = Authorization ? Authorization.split(' ')[1] : '';
        if (jwttoken) {
            const eventBody = JSON.parse(event.body);
            const deleteUser = await userRepo.deleteUser(eventBody.id);
            if (!deleteUser) {
                return utility.createResponse(false, null, 500, "Delete Fail User");
            }
            return utility.createResponse(true, deleteUser, 200, "Delete User Successfully");
        }
        else {
            utility.createResponse(false, null, 401, "UnAuthorization");
        }
    } catch (error) {
        console.log(error);
        utility.createResponse(false, null, 401, "UnAuthorization");
    }
}

module.exports.updateUser = async (event) => {
    try {
        const { Authorization } = event.headers;
        const jwttoken = Authorization ? Authorization.split(' ')[1] : '';
        if (jwttoken) {
            const eventBody = JSON.parse(event.body);
            const updateUser = await userRepo.updateUser(eventBody);
            if (updateUser == null) {
                return utility.createResponse(false,null,500,"User not existed");
            }
            return utility.createResponse(true,updateUser,200,"Update user successfully");
        }
    } catch (error) {
        utility.createResponse(false, null, 401, "UnAuthorization");
        console.log(error)
    }
}

module.exports.login = async (event) => {
    try {
        const { username, password } = JSON.parse(event.body);
        const getUserFromUsername = await userRepo.getUserByUsername(username);
        if(!getUserFromUsername)
        {
            return  utility.createResponse(false, null, 500, "User is not existed");
        }
        if (!passwordHash.verify(password, getUserFromUsername.password)) {
            return  utility.createResponse(false, null, 404, "Password is incorrect");
        }
        const data = {
            userId: getUserFromUsername.id,
            username: getUserFromUsername.username
        }
        let token = utility.createToken(data);
        const result = {
            username: getUserFromUsername.username,
            token: token
        }
        return utility.createResponse(true, result, 200, "Login successfully");
    } catch (error) {
        console.log(error)
        return utility.createResponse(false, null, 500, "Error Internal");
    }

}
module.exports.check = async(event) =>{
    try {
        const checkdb= await userRepo.checkDB();
        console.log(checkdb);
    } catch (error) {
        console.log(error)
    }
}