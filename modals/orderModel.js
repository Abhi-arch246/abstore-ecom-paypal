const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({

    userId: {
        type: String,
        require
    },
    name: {
        type: String,
        require
    },
    email: {
        type: String,
        require
    },
    orderItems: [{
        name: { type: String, require },
        quantity: { type: Number, require },
        _id: { type: String, require },
        price: { type: Number, require }
    }],
    shippingAddress: {
        address: { type: String, require },
        city: { type: String, require },
        postalCode: { type: Number, require },
        country: { type: String, require }
    },
    payment: {
        type: String,
    },
    paidAt: {
        type: Date,
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String }
    },
    orderAmount: {
        type: Number,
        default: 0,
        require
    },
    isPaid: {
        type: Boolean,
        default: false,
        require
    },
    isDelivered: {
        type: Boolean,
        default: false,
        require
    }


}, {
    timestamps: true
})

const Order = mongoose.model('orders', orderSchema)
module.exports = Order