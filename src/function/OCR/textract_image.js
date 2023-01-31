
const utility = require('utility')


const azureOCR = require('helper').azure


const textract_image = async(event) =>{
    try {
        const body = JSON.parse(event.body)
        const {url} = body

        const signedUrl = await signedUrlEkyc(url)
        const azureOCRResult = await azureOCR(signedUrl)
        return utility.createResponse(true,azureOCRResult)
    } catch (error) {
        console.log(error)
        return utility.createResponse( false, null, code.ERROR, message.server_error )
    }
}

const signedUrlEkyc = async(url) =>{
    try {
        const key = url.split(".amazonaws.com/")[1]
        const s3 = await connectS3()
        const signedUrl = s3.getSignedUrl('getObject', {
            Key: key,
            Bucket: process.env.BUCKET,
            Expired: 3600
        })
        return signedUrl
    } catch (error) {
        console.log(error.message)
        return false
    }
}

module.exports = {
    textract_image
}