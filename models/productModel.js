const mongoose = require('mongoose');
const {Schema} = mongoose;

/**
    * @author Alexandru Ivanescu <ivanescu.alexandru01@gmail.com>
    * Create schema for products using mongoose and mongodb.
    * Type: Schema.Types.Mixed - it's to used in schema number or string in the same place.
    * The enum validator is an array that will check if the value given is an item in the array.
    * The trim in white spaces will be removed from both sides of the string.
*/

const productSchema = new mongoose.Schema({
    name: {
        type: String , 
        required: [true , 'A product must have a name'],
        unique: true,
        trim: true,
        maxLength: [75 , 'A product must less or equal the 75 characters'],
        minLenght: [10 , 'A product must have more or equal the 10 characters'],
    },

    price: {
        type: Number ,
        require: [true , 'A product must have a price']
    },

    description: {
        type: String , 
        required: [true , 'A product must have a description'],
        trim: true
    },

    manufacturer: {
        type: String ,
        required: [true , 'A product must have a manufacturer'],
        trim: true
    },
    alloy: {
        type: String ,
        required:[true , 'A product must have type of alloy'],
        enum: {
            values: ['Gold-Au' , 'Silver-Ag' , 'Platinum-Pt' , 'Gold-Au(90%) , Silver-AG(6%)'],
            message: 'You can only choose between Gold-Au, Silver-Ag and Platinum-Pt'
        }
    },

    weight: {
        type: Schema.Types.Mixed ,
        required: [true , 'A product must have a weight']
    },

    fineness: {
        type: Schema.Types.Mixed ,
        required: [true , 'A product must have fineness included']
    },

    dimensions: {
        type: Schema.Types.Mixed ,
        required: [true , 'A product must have dimensions included']
    },

    stock: {
        type: Schema.Types.Mixed ,
        required: [true , 'A product must have stock']
    },

    nextStock: {
        type: [Date] ,
        require: [true , 'Require next stock for products']
    },

    images: [String],

    createdAt: {
        type: Date ,
        default: Date.now(),
        select: false
    },

    rareProduct: {
        type: Boolean,
        select: false
    }
});

productSchema.pre('aggregate' , function(next) {
    this.pipeline().unshift({ $match: { rareProduct: { $ne: true } } });
    console.log(this.pipeline());
    next();
});

const Product = mongoose.model('Product' , productSchema);

module.exports = Product;