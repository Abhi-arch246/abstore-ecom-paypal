const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()
const dbconnect = require('./dbconnect')
const UserRoute = require('./routes/UserRoute')
const ProductRoute = require('./routes/ProductRoute')
const OrderRoute = require('./routes/OrderRoute')
const PlaceorderRoute = require('./routes/PlaceorderRoute')
// const paypal = require('paypal-rest-sdk')


// paypal.configure({
//     'mode': 'sandbox',
//     'client_id': process.env.CLIENT_ID,
//     'client_secret': process.env.SECRET_ID
// })


app.use(bodyParser.json())
app.use("/api/products/", ProductRoute)
app.use("/api/users/", UserRoute)
app.use("/api/orders/", PlaceorderRoute)
app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.CLIENT_ID)
})
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
    })
}

const port = process.env.PORT || 5000
app.listen(port, () => console.log("Server started on server 5000"))