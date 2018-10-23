const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/Users');

router.get('/', (req, res, next) => {
    User.find().exec().then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err => {
        console.log(err);
    })
});

router.post('/', (req, res) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if(user){
          return res.json({
            status: 'EMAIL_ALREADY_EXISTS',
            message: 'Email already exists',
          });
        }
        
        const profile = gravatar.url(req.body.email, {
          s: 200, // size
          r: 'pg', // ratings
          d: 'mm', // default
        })
  
        const newUser = User({
          name: req.body.name,
          email: req.body.email,
          birthDate: moment(req.body.birthDate, 'DD/MM/YYYY'),
          password: req.body.password,
          profile,
        });
  
        bcrypt.hash(newUser.password, 10, (err, hash) => {
          if(err) throw new Error(err);
  
          newUser.password = hash;
          newUser.save()
            .then(user => res.json({
              status: true,
              message: 'User created successfully!',
            }))
            .catch(err => {
              throw new Error(err)
            });
        });
      });
  });

router.get('/:userId', (req, res, next) => {
    const requestId = req.params.userId;
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