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

let bucket;
mongoose.connection.on("connected", () => {
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: process.env.BUCKET_NAME,
    });
});

const router = Router();

router.post('/add_product', [
    upload().single("file"),
    name(),
    price(),
    gender().isGender(),
    age().isAgeValid(),
    size().isSize(),
    clothingType()
], async (req, res) => {
    const result = validationResult(req);
    
    if (!result.isEmpty()) {
        if (req.file) {
            await bucket.delete(new mongoose.Types.ObjectId(req.file.id));
        }
        return res.status(400).send({ errors: result.array() });
    }

    const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
    
    if (!req.file) {
        return res.status(400).send({ msg: "File must be specified" });
    }
    
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
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
        return res.status(201).send({ msg: "Successfully added product" });
    } catch (err) {
        console.error(err);
        return res.status(400).send({ msg: "Unsuccessfully added product" });
    }
});

module.exports = router;
