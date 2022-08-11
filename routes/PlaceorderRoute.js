const asyncHandler = require('express-async-handler')
const Order = require('../modals/orderModel')
const express = require('express')
const router = express.Router()

router.post('/', asyncHandler(async (req, res) => {
    const { cartItems, shippingAddress, orderAmount, userid, payment, name, email } = req.body
    if (!cartItems) {
        res.status(400)
        throw new Error('No orders')
        return
    } else {

        try {
            const order = new Order({
                orderItems: cartItems,
                userId: userid,
                payment,
                name,
                email,
                shippingAddress,
                orderAmount
            })
            // console.log(order);
            const createOrder = await order.save()
            res.status(201).json(createOrder)
        } catch (error) {
            console.log(error);
        }

    }
}))


router.get('/:id', asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    // console.log(req.params.id);
    if (order) {
        res.json(order)
    } else {
        res.status(500)
        throw new Error('Order not found')
    }

}))

router.put('/:id/pay', asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    // console.log(req.params.id);
    // console.log(order);
    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        // console.log(order);

        const updateOrder = await order.save()
        res.json(updateOrder)
    } else {
        res.status(500)
        throw new Error('Order not found')
    }

}))

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
