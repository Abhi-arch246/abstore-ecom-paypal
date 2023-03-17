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

//Deploy code dev to prod
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
    })
}

const port = process.env.PORT || 5000
app.listen(port, () => console.log("Server started on server 5000"))



//Heroku Deploy package.json
// "scripts": {
//     "client-install": "npm install --prefix client",
//     "server": "nodemon server.js",
//     "client": "npm start --prefix client",
//     "dev": "concurrently \"npm run server\" \"npm run client\"",
//     "start": "node server.js",
//     "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
//   }