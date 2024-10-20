const {
    body,
    validationResult,
    matchedData
    } = require('./ProductValidator')

const NAME_MIN = process.env.NAME_MIN
const NAME_MAX = process.env.NAME_MAX
const PRICE_MIN = process.env.PRICE_MIN
const PRICE_MAX = process.env.PRICE_MAX
const SIZE_MIN = process.env.SIZE_MIN
const SIZE_MAX = process.env.SIZE_MAX



const name = () => body('name').notEmpty().escape().isLength({ min: NAME_MIN, max: NAME_MAX }).withMessage("A name for this product is required")
const price = () => body('price').notEmpty().escape().isLength({ min: PRICE_MIN, max: PRICE_MAX }).toInt().isNumeric().withMessage("A price for this product is required")
const gender = () => body('gender').notEmpty().escape().isLength({min: 1, max: 1 }).withMessage("Must specify whether this product is designed for either men or women")
const age = () => body('age').notEmpty().escape().escape().withMessage("Age group this product is designed for must be specified")
const stock = () => body('stock').notEmpty().escape().toInt().isNumeric().withMessage("Must assign the current stock for this product")
const size = () => body('size').notEmpty().escape().isLength({ min: SIZE_MIN, max: SIZE_MAX }).withMessage('Size of the product must be specified')
const pictureName = () => body('pictureName').notEmpty().escape().withMessage('Image name must be specified')
const image = () => body("file").notEmpty()

module.exports = {
    validationResult,
    matchedData,

    image,
    name,
    price,
    gender,
    age,
    stock,
    size,
    pictureName
}
