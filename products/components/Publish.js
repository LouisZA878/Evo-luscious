const KafkaController = require('./kafkaController')

const Publish = async (topicName, message) => {
    try {
        const messages =[{
            key: message?.key,
            value: message?.value,
            parition: message?.partition
        }]

        const kafkaController = new KafkaController()
        await kafkaController.publishMessageToTopic( topicName, messages )

        console.log('worked')
    } catch (err) {
        console.error(err)
    }
}

module.exports = Publish