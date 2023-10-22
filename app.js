const express = require('express');
const morgan = require('morgan');
const app = express();

/**
 * Development login!
 */
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
  console.log('You are in : ' + process.env.NODE_ENV);

module.exports = app;