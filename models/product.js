const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId:{
        type:Number
    },
    productHref:{
        type:String
    },
    productIsNew:{
        type:Boolean
    },
    productIsSale:{
        type:Boolean
    },
    productName:{
        type:String,
        required: true,
    },
    productImage: {
        type:String,
    },
    productImageAlt:{
        type:String
    },
    productCategory:{
        type:String,
    },
    productSubcategory:{
        type:String
    },
     productPrice: {
        type:Number
    },
    productDescription: {
        type:String
    },   
    productInventory:{
        type:Number
    },
    productBrand:{
        type:String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('products', productSchema);