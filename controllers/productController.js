const Product = require('./../models/productModel');
const APIFeatures = require('./../utils/apiFeature');
const catchAsync = require('./../utils/catchAsync');

exports.getAllProducts = catchAsync(async (req , res , next) => {
    // Execute the Query
    const features = new APIFeatures(Product.find() , req.query)
       .filter()
       .sort()
       .limitFields()
       .paginate();
    const products = await features.query
  
    //Send response 
    res.status(200).json({
      status : 'success' ,
      result: products.length ,
      data: {
        products
      }
    });
  });