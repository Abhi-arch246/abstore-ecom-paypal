const express = require('express')
const router = express.Router()
const Product = require('../modals/productModal')
router.get('/getallproducts', (req, res) => {
    Product.find({}, (err, docs) => {
        if (!err)
            return res.send(docs)
        else
            return res.status(400).json({ msg: 'Error' })
    })
})

router.post('/getallproductbyid', (req, res) => {
    Product.find({ _id: req.body.id }, (err, docs) => {
        if (!err) {
            res.send(docs[0])
        }
        else {
            return res.status(400).json({ message: "Something went wrong" })
        }

    })
}
)

router.post('/addreview', async (req, res) => {
    const { review, productid, currentUser } = req.body

    const product = await Product.findById({ _id: productid })

    const reviewobj = {
        name: currentUser.name,
        userid: currentUser._id,
        rating: review.rating,
        comment: review.comment
    }

    product.reviews.push(reviewobj)

    var rating = product.reviews.reduce((acc, x) => acc + x.rating, 0) / product.reviews.length
    product.rating = rating

    product.save(err => {
        if (err)
            res.send('Something went wrong')
        else
            res.send('Review upated successfully')
    })
})

module.exports = router;