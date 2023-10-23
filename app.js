const express = require('express');
const morgan = require('morgan');

const productRouter = require('./routes/productRouter');
const app = express();

/**
 * Development login!
 */
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
  console.log('You are in : ' + process.env.NODE_ENV);

/**
 * Simple middleware.
 */
  app.use(express.json());

/**
 * Define router for product.
 */
app.use('/api/import-export/products' , productRouter);

module.exports = app;