const express =  require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/Users');


//mongoose.connect('mongodb://girimlab:G1r1mlab@ds133360.mlab.com:33360/mycreactcruduser');

mongoose.connect('mongodb://XXXXXX:XXXXX@XXXXX.mlab.com:33360/XXXXX')
  .then(() => console.log('Connected to Database girimlab'))
  .catch(err => {
    throw new Error(err)
  });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);
module.exports = app;