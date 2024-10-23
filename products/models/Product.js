const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: process.env.NAME_MIN, 
        maxlength: process.env.NAME_MAX  
      },
    price: {
        type: Number,
        require: true,
        minlength: process.env.PRICE_MIN,
        maxlength: process.env.PRICE_MAX  
    },
    gender: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1
    },
    age: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true

    },
    size: {
        type: String,
        required: true,
        minlength: process.env.SIZE_MIN,
        maxlength: process.env.SIZE_MAX
    },
    clothingType: {
        type: String,
        required: true
    },
    pictureName: {
        type: String,
        required: true
    },
    pictureID: {
        type: String,
        required: true
    }


})

const Product = mongoose.model('Product', newProductSchema);
module.exports = Product;