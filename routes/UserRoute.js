const express = require('express')
const router = express.Router()
const User = require('../modals/userModal')
const Token = require('../modals/tokenModel')
const mailSender = require('../mailSender')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


router.post('/register', (req, res) => {
    const { name, email, pass } = req.body

    User.find({ email }, async (err, docs) => {
        if (docs.length > 0) {
            return res.status(400).json({ message: 'User already exists' })


        }
        else {
            try {
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(pass, salt)
                const newUser = await User.create({
                    name: name,
                    email: email,
                    pass: hashedPassword
                })

                await mailSender(newUser, 'verify-email')
                return res.send('User Registration Success')
            } catch (error) {
                console.log(error);
            }


        }
    })

})

router.post("/login", async (req, res) => {

    const { email, pass } = req.body
    const user = await User.findOne({ email })
    if (user) {
        if (user && (await bcrypt.compare(pass, user.pass))) {
            if (user.isVerified) {
                const data = {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
                const token = jwt.sign(data, "keysec123", { expiresIn: '30d' })
                return res.send({ success: true, msg: data, token: token })
            } else {
                return res.status(200).send({ success: false, msg: "Email not verified" })
            }
        }
        else {
            return res.status(200).send({ success: false, msg: "Invalid password" })
        }
    } else {
        return res.status(200).send({ success: false, msg: "Your email not registered" })

    }
})

router.post("/update", async (req, res) => {
    const { userid, updatedUser } = req.body
    const email = updatedUser.email
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(updatedUser.currentpass, user.pass))) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(updatedUser.pass, salt)
        User.findByIdAndUpdate(userid, {
            name: updatedUser.name,
            email: updatedUser.email,
            pass: hashedPassword
        }, (err => {
            if (err) {
                return res.status(400).json({ message: 'Something went wrong' })
            } else {
                return res.send({ success: true, msg: 'User details updated successfully\nYou will be directed to login page' })
            }
        }))
    } else {
        return res.send({ success: false, msg: "Current password is invalid" })
    }

})

router.post('/verify-email', async (req, res) => {
    try {
        const { token } = req.body
        // console.log(token);
        const tokenDetail = await Token.findOne({ token })
        // console.log(tokenDetail);
        if (tokenDetail) {
            // console.log("line99");
            await User.findByIdAndUpdate(tokenDetail.userid, { isVerified: true })
            await Token.findOneAndDelete({ token })
            res.send({ success: true, msg: 'Email verified Successfully' })
        } else {
            res.send({ success: false, msg: 'Invalid Token' })

        }

    } catch (error) {
        console.log(error);
    }
})

module.exports = router
