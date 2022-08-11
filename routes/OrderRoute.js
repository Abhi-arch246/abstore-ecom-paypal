const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const stripe = require('stripe')('sk_test_51KyfVaSJLir7fHVuWyseSLtqFC3dN3lWVK6gxApYEFOD1g8JFlsvYRhQQWXG2nQqGNhAlLZiQjnVpgvFGXaGUkVA00TV8Gd5VA')
const Order = require('../modals/orderModel')

router.post('/placeorder', async (req, res) => {

    const { token, subtotal, currentUser, cartItems } = req.body
    const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
    })

    const payment = await stripe.paymentIntents.create({
        amount: subtotal * 100,
        currency: 'inr',
        payment_method_types: ['card'],
        customer: customer.id,
        receipt_email: token.email

    }, {
        idempotencyKey: uuidv4()
    })



    if (payment) {
        const order = new Order({
            userId: currentUser._id,
            name: currentUser.name,
            email: currentUser.email,
            orderItems: cartItems,
            shippingAddress: {
                address: token.card.address_line1,
                city: token.card.address_city,
                country: token.card.address_country,
                postalCode: token.card.address_zip
            },
            orderAmount: subtotal,
            transactionId: token.card.id,
            isDelivered: false
        })



        order.save(err => {
            if (!err) {
                res.send("Order Placed Successfully")
            }

            else
                res.send("Something went wrong")
        })
    } else {
        return res.status(400).json({ message: 'Payment Failed' })
    }
})


router.post('/getordersbyuserid', (req, res) => {
    const userid = req.body.userid

    Order.find({ userId: userid }, (err, docs) => {

        if (err) {
            res.error('Something went wrong')
        } else {
            res.send(docs)
        }

    })
})


router.post('/getorderbyid', (req, res) => {
    const orderid = req.body.orderid

    Order.find({ _id: orderid }, (err, docs) => {

        if (err) {
            res.error('Something went wrong')
        } else {
            res.send(docs[0])
        }

    })
})


module.exports = router
