const nodeMailer = require('nodemailer')

const sendMail = async(to, subject, text, htmlContent) =>{
    const transporter = nodeMailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth:{
            user: process.env.EMAIL,
            pass: process.env.PASSWORD_EMAIL
        },
    })

    const payload = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        text: text,
        html: htmlContent
    }

    try {
        await transporter.sendMail(payload)
        return true;
    } catch (error) {
        console.error(error)
        return false
    }
}

module.exports = {
    sendMail
}