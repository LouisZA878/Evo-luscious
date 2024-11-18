const { Router } = require('express')
const mongoose = require('mongoose')


const Publish = require('../../components/Publish')
const Product = require('../../models/Product')
const {
    productID,
    imageIDBody,
    validationResult,
    matchedData
} = require('../../components/Validator')

const { TOPIC_NAME, API_V, LOGS_KEY_INFO, LOGS_PAR_INFO, LOGS_KEY_ERROR, LOGS_PAR_ERROR } = process.env


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
    imageIDBody().isImageIDValid()
]
,async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      const message = {
        key: LOGS_KEY_ERROR,
        value: `Message: Express input error - Route: ${API_V}/delete_product`,
        partition: LOGS_PAR_ERROR
    }

    Publish(TOPIC_NAME, message)

        return res.status(400).send({ errors: result.array() })
    }
    
    const { productID, imageID } = matchedData(req);
    try {
      const message = {
        key: LOGS_KEY_INFO,
        value: `Message: Product deletion successful - Route: ${API_V}/delete_product - `,
        partition: LOGS_PAR_INFO
    }

    Publish(TOPIC_NAME, message)

        await bucket.delete(new mongoose.Types.ObjectId(imageID))
        await Product.deleteOne({ _id:new mongoose.Types.ObjectId(productID) })
    
        res.status(200).send({ msg: 'Product deletion success'})

    } catch (err) {
      const message = {
        key: LOGS_KEY_ERROR,
        value: `Message: Product deletion unsuccessful - Route: ${API_V}/delete_product - `,
        partition: LOGS_PAR_ERROR
    }

    Publish(TOPIC_NAME, message)

        console.error(err)
        res.status(400).send({ msg: 'Product deletion failure'})
    }
    
})

module.exports = router