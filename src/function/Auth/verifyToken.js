const jwt = require('jsonwebtoken')
require('dotenv').config();
const userRepository = require('../../layer/repository/UserRepository')



const verifyToken = async(event) =>{
    const authorizationToken = event.authorizationToken;
    const jwtToken = authorizationToken ? authorizationToken.split(' ')[1]: '';


    const res=await jwt.verify(jwtToken,process.env.jwt_secret,async(err,decode) =>{
        if(err){
            return{
                code: 401,
                message: "UnAuthorization"
            }
        }
        else{
            return{
                code: 200,
                message:"Successs"
            }
        }
    })
    return res;
}
module.exports={
    verifyToken
}