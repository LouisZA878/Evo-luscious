const { Router } = require('express');
const mongoose = require('mongoose');

const Product = require('../../models/Product');
const {
    name,
    price,
    gender,
    age,
    size,
    validationResult,
    matchedData,
    clothingType,
} = require('../../components/Validator');
const { upload } = require('../../utils/upload');
const Publish = require('../../components/Publish')
const { TOPIC_NAME, API_V, LOGS_KEY_INFO, LOGS_PAR_INFO, LOGS_KEY_ERROR, LOGS_PAR_ERROR } = process.env


let bucket;
mongoose.connection.on("connected", () => {
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: process.env.BUCKET_NAME,
    });
});

const router = Router();

router.post('/add_product',
[
    upload().single("file"),
    name(),
    price(),
    gender().isGender(),
    age().isAgeValid(),
    size().isSize(),
    clothingType()
]
, async (req, res) => {
    const result = validationResult(req);
    
    if (!result.isEmpty()) {
        const message = {
            key: LOGS_KEY_ERROR,
            value: `Message: Express input failure - Route: ${API_V}/add_product`,
            partition: LOGS_PAR_ERROR
        }

        Publish(TOPIC_NAME, message)

        if (req.file) {
            await bucket.delete(new mongoose.Types.ObjectId(req.file.id));
        }
        return res.status(400).send({ errors: result.array() });
    }

    const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
    
    if (!req.file) {
        const message = {
            key: LOGS_KEY_ERROR,
            value: `Message: No file found - Route: ${API_V}/add_product`,
            partition: LOGS_PAR_ERROR
        }

        Publish(TOPIC_NAME, message)

        return res.status(400).send({ msg: "File must be specified" });
    }
    
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
        const message = {
            key: LOGS_KEY_ERROR,
            value: `Message: File must be an image - Route: ${API_V}/add_product`,
            partition: LOGS_PAR_ERROR
        }

        Publish(TOPIC_NAME, message)

        return res.status(400).send({ msg: 'File must be an image' });
    }

    const { name, price, clothingType, gender, age, size } = matchedData(req);

    const newProduct = new Product({
        name,
        price,
        gender,
        age,
        stock: Math.floor(Math.random() * 100 + 1),
        size,
        clothingType,
        pictureName: req.file.filename,
        pictureID: req.file.id,
        skeleton: false
    });

    try {
        await newProduct.save();
        console.log("Added product: " + req.file.filename + "_" + new Date().getMilliseconds());
        const message = {
            key: LOGS_KEY_INFO,
            value: `Message: Product creation successful - Route: ${API_V}/add_product - `,
            partition: LOGS_PAR_INFO
        }
    
        Publish(TOPIC_NAME, message)
        
        return res.status(201).send({ msg: "Successfully added product" });
    } catch (err) {
        const message = {
            key: LOGS_KEY_ERROR,
            value: `Message: Product creation failure - Route: ${API_V}/add_product`,
            partition: LOGS_PAR_ERROR
        }

        Publish(TOPIC_NAME, message)
        console.error(err);
        return res.status(400).send({ msg: "Unsuccessfully added product" });
    }
});

module.exports = router;
