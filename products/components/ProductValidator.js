// Modules
const mongoose = require('mongoose')
const { ExpressValidator } = require('express-validator')

// Components
const Product = require('../models/Product')

let bucket;
(() => {
  mongoose.connection.on("connected", () => {
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: process.env.BUCKET_NAME,
    });
  });
})();

// Custom decoder
const { body, query, param, validationResult, matchedData } = new ExpressValidator(
    {
      isClothingType: async value => {
        const ClothingType = ["Bundle", "Pants", "Shirt", "Accesories"]
        if(!ClothingType.includes(value)) {
          throw new Error("Must be a valid clothing type")
        }
      },
      isSize: async value => {
        const Size = ["SM", "MD", "LG"]

        if(!Size.includes(value)) {
          throw new Error("Must be a valid size")
        }
      },
      isGender: async value => {
        const Gender = ["M", "F"]

        if(!Gender.includes(value)) {
          throw new Error("Must be a valid gender")
        }
      },
      isAgeValid: async value => {
        const Age = ["Toddler", "Teenager", "Adult"]

        if(!Age.includes(value)) {
          throw new Error("Must be a valid age")
        }
      },
      isIDValid: async value => {
        const product = await Product.findById(new mongoose.Types.ObjectId(value))
        if(!product) {
          throw new Error('Product does not exist')
        }
      },
      isImageIDValid: async value => {
        const file = await bucket
        .find({ _id: new mongoose.Types.ObjectId(value) })
        .toArray();

        if (file.length === 0) {
          throw new Error('Image ID does not exist')
        }
      },

    },
  );


module.exports = {
  body,
  query,
  param,
  validationResult,
  matchedData
}