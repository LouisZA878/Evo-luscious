const { Router } = require('express')
const mongoose = require('mongoose')

const Product = require('../../models/Product')
const {
    productID
} = require('../../components/Validator')

let bucket;
(() => {
  mongoose.connection.on("connected", () => {
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: process.env.BUCKET_NAME,
    });
  });
})();

const router = Router()

router.delete('/delete_product',
[
    productID().isIDValid(),
    imageID().isImageIDValid()
]
,async (req, res) => {

    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() })
    }
    
    const { productID, imageID } = matchedData(req);

    try {
        await bucket.delete(new mongoose.Types.ObjectId(imageID))
        await Product.deleteOne({ _id:new mongoose.Types.ObjectId(productID) })
    
        res.status(200).send({ msg: 'Product deletion success'})

    } catch (err) {
        console.error(err)
        res.status(400).send({ msg: 'Product deletion failure'})
    }
    
})

module.exports = router