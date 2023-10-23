const express = require('express');
const productController = require('./../controllers/productController');

const router = express.Router();

/**
 * Define router for product.
 */
router
.route('/')
.get(productController.getAllProducts);

module.exports = router;