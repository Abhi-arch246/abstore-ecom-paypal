const nodemailer = require('nodemailer')
const Token = require('./modals/tokenModel')
const bcrypt = require('bcryptjs')

module.exports = async (data, mailType) => {

    try {
        const mailConfig = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: true, // upgrade later with STARTTLS
            auth: {
                user: "epicteachings@gmail.com",
                pass: "zbajbclbcdlnfwbh",
            },
        });


        const verifyToken = await bcrypt.hashSync(data._id.toString(), 10).replaceAll('/', '')
        const token = new Token({ userid: data._id, token: verifyToken })
        await token.save()
        const content = `<div><h1>Please verify your mail by clicking this link</h1></br><a href="http://localhost:3000/verify/${verifyToken}">Click this token</a></div>`

        console.log(content);
        console.log(data.email);


        const mailOptions = {
            from: "epicteachings@gmail.com",
            to: data.email,
            subject: 'Verify your mail for JWT App',
            html: content
        }

        await mailConfig.sendMail(mailOptions)
    } catch (error) {
        console.log(error);
    }


}
