const { Router } = require('express')

const Product = require('../../models/Product')
const {
    image,
    name,
    price,
    gender,
    age,
    stock,
    size,
    pictureName,
    validationResult,
    matchedData
} = require('../../components/Validator')
const { upload } = require('../../utils/upload')

const router = Router()


router.post('/add_product',
[
    name(),
    price(),
    gender(),
    age(),
    stock(),
    size(),
    upload().single("file")
]
,(req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() })
    }
    const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
    if (!req.file) {
        return res.status(400).send({ msg: "File must be specified"})
    }
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
        return res.status(400).send({ msg: 'File must be an image' })
    }
    
    const { name, price, gender, age, stock, size } = matchedData(req);

    
    const newProduct = new Product({
        name,
        price,
        gender,
        age,
        stock,
        size,
        pictureName: req.file.filename,
        pictureID: req.file.id
    })
    newProduct.save()
        .then(() => {
            console.log("Added product: " + pictureName + "_" + new Date().getMilliseconds())
            res.status(201).send({ msg: "Successfully added product"})
        })
        .catch(err => {
            console.error(err)
            res.status(400).send({ msg: "Unsuccessfully added product"})
        })


    
})

module.exports = router