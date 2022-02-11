import * as SQS from 'aws-sdk/clients/sqs';
import 'dotenv/config'

export default class SQSHelper {
    private _data;
    get data() {
        return this._data;
    }

    set data(value: object) {
        this._data = value;
    }

    private sqs = new SQS({
        region: process.env.AWS_REGION || 'us-east-1',
        apiVersion: 'latest'
    })

    public async getMessages() {
        return await this.sqs.receiveMessage({
            AttributeNames: ['SentTimestamp'],
            MaxNumberOfMessages: 500,
            MessageAttributeNames: ['*'],
            QueueUrl: process.env.AWS_QUEUE_URL
        }).promise();
    }

    public async remove(ReceiptHandle) {
        await this.sqs.deleteMessage({
            QueueUrl: process.env.AWS_QUEUE_URL,
            ReceiptHandle: ReceiptHandle,
        }).promise()
    }

    public async sendMessages(obj: object, QueueUrl: string = '') {
        const params = {
            MessageBody: JSON.stringify(obj),
            QueueUrl: QueueUrl || process.env.AWS_QUEUE_URL
        }
        return new Promise((resolve, reject) => {
            return this.sqs.sendMessage(params, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data.MessageId)
                }
            });
        })
    }
}