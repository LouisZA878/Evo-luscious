// Environment Variables
if ( process.env.PROD_TYPE !== 'docker' ) {
    require('dotenv').config();
}

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const KafkaController = require('./components/kafkaController')

// Envs
const { PORT, API_V, MONGO, TOPIC_NAME } = process.env

// Middleware
const app = express()
app.use(cors())
app.use(express.json())

const start = async (mongo, port) => {
    try {
        app.listen(port, () => {
            console.log(`Logs server running on Port: ${port}`)
        })
        mongoose.connect(mongo)
            .then(() => console.log(`Logs DB running on Port: ${port}`))
    } catch (err) {
        console.error(err)
    }
}
start(MONGO, PORT)
const initKafka = async (topicName) => {
    try {
        const kafkaController = new KafkaController()
        await kafkaController.consumeMessageFromTopic( topicName, (message) => {
            console.log(message)
        })

    } catch (err) {
        console.error(err)
    }
}
initKafka(TOPIC_NAME)

// Route imports
const CreateTopic = require('./routes/Topic')
const Event = require('./routes/Event')

// Route usage

app.use(API_V, CreateTopic)
app.use(API_V, Event)
