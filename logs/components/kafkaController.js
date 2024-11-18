const dotenv = require('dotenv')
const { Kafka } = require('kafkajs')

dotenv.config()

const { CLIENT_ID, BROKER_1, GROUP_ID } = process.env

class KafkaController {
    constructor() {
        this.kafka = new Kafka({
            clientId: CLIENT_ID,
            brokers: [BROKER_1]
        })
    }
    // Method to create multiple partitions

    async createTopic( topicName, noOfPartition ) {
        try {
            // Create an admin client to manage kafka topic
            const admin = this.kafka.admin()
            await admin.connect()
            await admin.createTopics({
                topics: [{
                    topic: topicName.toString(),
                    numPartitions: parseInt(noOfPartition),
                    replicationFactor: 1
                }]
            })
            await admin.disconnect()


        } catch (err) {
            console.error(err)
            throw err
        }
    }

    // Publish message to topic
    async publishMessageToTopic( topicName, messages ) {
        const producer = this.kafka.producer();
        try {
            await producer.connect()
            await producer.send({
                topic: topicName,
                messages
            })
        } catch (err) {
            console.error(err)
            throw err
        } finally {
            await producer.disconnect()
        }
    }
    

    // Consume a message
    async consumeMessageFromTopic(topicName, callback) {
        const consumer = this.kafka.consumer({
            groupId: GROUP_ID
        })
        try {
            await consumer.connect()
            await consumer.subscribe({
                topic: topicName,
                fromBeginning: true
            })
            await consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    try {
                        const value = `Received message: ${message.value.toString()} from partition ${partition} & topic ${topic}`;
                        callback(value);
                    } catch (processingError) {
                        console.error('Error processing message:', processingError);
                    }
                }
            })
        } catch (err) {
            console.error(err)
            throw err
        }
    }
    
}

module.exports = KafkaController