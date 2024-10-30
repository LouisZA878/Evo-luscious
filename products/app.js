// Environment Variables
if ( process.env.PROD_TYPE !== 'docker' ) {
    require('dotenv').config();
}
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// Env's
const PORT = process.env.PORT
const PORT_CLIENT = process.env.PORT_CLIENT
const HOST = process.env.HOST
const API_V = process.env.API_V
const MONGO = process.env.MONGO


// Middleware
const app = express()
app.use(cors({
    origin: `http://${HOST}:${PORT_CLIENT}`,
    methods: ['GET', 'POST', 'DELETE']
}))
app.use(express.json())

const start = async (mongo, port) => {
    try {
        app.listen(port, () => {
            console.log(`Server run on port: ${port}`)
        })
        mongoose.connect(mongo)
            .then(() => console.log(`Mongo_DB Products running`))
    } catch (err) {
        console.error(err)
    }
}
start(MONGO, PORT)




// Import Routes
const newProduct = require('./routes/v1/NewProduct')
const Images = require('./routes/v1/Images')
const Products = require('./routes/v1/Products')
// const FProducts = require('./routes/v1/FilteredProducts')
const deleteProduct = require('./routes/v1/DeleteProduct')
const Test = require('./routes/v1/Test')

// Routes
app.use(API_V, newProduct)
app.use(API_V, Images)
app.use(API_V, Products)
// app.use(API_V, FProducts)
app.use(API_V, deleteProduct)
app.use(API_V, Test)

