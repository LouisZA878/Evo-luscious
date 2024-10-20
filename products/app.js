// Modules
require('dotenv').config()
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

let bucket;
(() => {
  mongoose.connection.on("connected", () => {
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: process.env.BUCKET_NAME,
    });
  });
})();

app.use(cors({
    origin: `http://${HOST}:${PORT_CLIENT}`,
    methods: 'GET,POST'
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
const Test = require('./routes/v1/Test')

// Routes
app.use(API_V, newProduct)
app.use(API_V, Test)

