const AWS = require("aws-sdk")


const connectS3  = async () =>{
    try{
        return new AWS.S3({
            accessKeyId: process.env.AWS_PUBLIC_KEY_ID,
            secretAccessKey: process.env.AWS_PRIVATE_KEY_ID
        })
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    connectS3
}