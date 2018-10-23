const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');
const User = require('../models/Users');
router.get('/', (req, res, next) => {
    Product.find().exec().then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err => {
        console.log(err);
    })
});

router.post('/', (req, res, next) => {
    console.log('before hitting req');
    console.log(req.body.name);
    console.log(req.body.price);
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save()
    .then(prod => result.json({
        status:true,
        message:'Product created successfully'
    }))
    .catch(err => { console.log(erro) })
});

router.get('/:productId', (req, res, next) => {
    const requestId = req.params.productId;
    if (requestId === 'special') {
        res.status(200).json({
            message: 'You have discovered some new way of getting data',
            ID: requestId
        })
    }
    else {
        User.find({}, (err, users) => {
            res.send(users);
        });
    }
});


router.get('/all', (req, res) => {
    User.find({}, (err, users) => {
        res.send(users);
    });
});

module.exports = router;