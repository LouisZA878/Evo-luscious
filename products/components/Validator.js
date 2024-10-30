const {
    body,
    query,
    validationResult,
    matchedData
    } = require('./ProductValidator')

const NAME_MIN = process.env.NAME_MIN
const NAME_MAX = process.env.NAME_MAX
const PRICE_MIN = process.env.PRICE_MIN
const PRICE_MAX = process.env.PRICE_MAX
const SIZE_MIN = process.env.SIZE_MIN
const SIZE_MAX = process.env.SIZE_MAX

const price = () => body('price').notEmpty().escape().isLength({ min: PRICE_MIN, max: PRICE_MAX }).toInt().isNumeric().withMessage("A price for this product is required")
const name = () => body('name').notEmpty().isLength({ min: NAME_MIN, max: NAME_MAX }).withMessage("A name for this product is required")
const gender = () => body('gender').notEmpty().escape().isLength({min: 1, max: 1 }).withMessage("Must specify whether this product is designed for either men or women")
const stock = () => body('stock').notEmpty().escape().toInt().isNumeric().withMessage("Must assign the current stock for this product")
const age = () => body('age').notEmpty().escape().withMessage("Age group this product is designed for must be specified")
const size = () => body('size').notEmpty().escape().isLength({ min: SIZE_MIN, max: SIZE_MAX }).withMessage('Size of the product must be specified')
const clothingType = () => body('clothingType').notEmpty().escape().withMessage('Clothing type must be specified')
const productID = () => body('productID').notEmpty().escape()

const genderQuery = () => query('gender').notEmpty().escape().isLength({min: 1, max: 1 }).withMessage("Must specify whether this product is designed for either men or women")
const ageQuery = () => query('age').notEmpty().escape().withMessage("Age group this product is designed for must be specified")
const sizeQuery = () => query('size').notEmpty().escape().isLength({ min: SIZE_MIN, max: SIZE_MAX }).withMessage('Size of the product must be specified')
const clothingTypeQuery = () => query('clothingType').notEmpty().escape().withMessage('Clothing type must be specified')
const pageQuery = () => query('page').notEmpty().isLength({ min: 1, max: 12 }).withMessage('Page must be specified')
const imageID = () => query('imageID').notEmpty().escape()


module.exports = {
    validationResult,
    matchedData,

    clothingType,
    name,
    price,
    gender,
    age,
    stock,
    size,
    productID,
    
    genderQuery,
    imageID,
    pageQuery,
    ageQuery,
    clothingTypeQuery,
    sizeQuery
}
