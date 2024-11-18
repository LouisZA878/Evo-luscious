const { Router } = require('express');

const Product = require('../../models/Product');
const Publish = require('../../components/Publish')
const {
    pageQuery,
    ageQuery,
    clothingTypeQuery,
    genderQuery,
    sizeQuery,
    validationResult,
    matchedData
} = require('../../components/Validator');
const { TOPIC_NAME, API_V, LOGS_KEY_INFO, LOGS_PAR_INFO, LOGS_KEY_ERROR, LOGS_PAR_ERROR } = process.env


const router = Router();

router.get('/all_products',
[
    genderQuery().isGender(),
    pageQuery(),
    ageQuery().isAgeValid(),
    clothingTypeQuery().isClothingType(),
    sizeQuery().isSize(),
],
async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }

    const ITEMS_PER_PAGE = process.env.ITEMS_PER_PAGE

    const data = matchedData(req)
    const clothingType = new RegExp(data.clothingType, 'ig')
    const gender = new RegExp(data.gender, 'ig')
    const age = new RegExp(data.age, 'ig')
    const size = new RegExp(data.size, 'ig')

    const productsAmount = await Product.countDocuments({ 
        clothingType, gender, age, size
     })
     const message = {
        key: LOGS_KEY_INFO,
        value: `Message: Express products fetched - Route: ${API_V}/all_products`,
        partition: LOGS_PAR_INFO
    };

    Publish(TOPIC_NAME, message);

    const products = await Product.find({
        clothingType, gender, age, size    
    })
        .skip( (data.page - 1 ) * ITEMS_PER_PAGE )
        .limit( ITEMS_PER_PAGE )
        .select("-pictureName -clothingType")

    res.status(200).send({
        productsAmount: Math.ceil(productsAmount / ITEMS_PER_PAGE),
        products
    })
});

module.exports = router;