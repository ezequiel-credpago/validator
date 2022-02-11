import {Consumer} from "sqs-consumer"
import listener from "../functions/Message";
const sqs = Consumer.create({
    queueUrl: process.env.AWS_QUEUE_URL,
    handleMessage: async (message) => {
        console.log('Received message', message)
    }
}).on('message_received', listener.messageReceived)
    .on('error', listener.error)
    .on('processing_error', listener.processingError);
export default sqs;

