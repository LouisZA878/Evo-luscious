const { Router } = require('express')

const KafkaController = require('../components/kafkaController')

const router = Router()

router.post('/create_topic', async ( req, res ) => {
    try {
        const { topicName, noOfPartition } = req.body
        const kafkaController = new KafkaController()

        await kafkaController.createTopic(topicName, noOfPartition)

        res.status(200).send({
            status: 'ok',
            message: 'Topic - Successfull Creation'
        })

    } catch (err) {
        res.status(500).send({
            message: 'Topic - Failed Creation'
        })
    }
})

module.exports = router