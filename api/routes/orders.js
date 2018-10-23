const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message:'Handling GET request to /orders'
    })
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /orders'
    })
});

router.get('/:orderId', (req, res, next) => {
    const requestId = req.params.productId;
    if(requestId === 'special'){
        res.status(200).json({
            message: 'You have discovered some new way of getting data from orders',
            ID: requestId
        })
    }
    else{
        res.status(200).json({
            message:'You hit parameterised orders route'
        })
    }
});

module.exports = router;