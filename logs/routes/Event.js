const { Router } = require('express')

const KafkaController = require('../components/kafkaController')

const router = Router()

router.post('/publish_event', async ( req, res ) => {
    try {
        const { topicName, message } = req.body;
        const messages =[{
            key: message?.key,
            value: message?.value,
            parition: 3
        }]

        const kafkaController = new KafkaController()
        await kafkaController.publishMessageToTopic( topicName, messages )

        res.status(200).send({
            status: 'ok',
            message: 'Produce - Successfull Production'
        })

    } catch (err) {
        res.status(500).send({
            message: 'Produce - Failed Production'
        })
    }
})

module.exports = router