import SQSHelper from "../helpers/Sqs";
import validator from "../validator/Validator";
import {Events} from "../entity/Events";
import 'dotenv/config'
import {getRepository} from "typeorm";

class Validator {
    get nextQueueUrl(): string {
        return this._nextQueueUrl;
    }

    set nextQueueUrl(value: string) {
        this._nextQueueUrl = value;
    }

    private validation = validator;
    private _nextQueueUrl = process.env.AWS_QUEUE_PROCESS_URL

    setData(value) {
        this._data = value;
        return this
    }

    private _data;

    private async sendToNextQueue() {
        await new SQSHelper().sendMessages(this._data, this._nextQueueUrl);
    }

    public async execute() {
        try {
            console.log('Save -> database', this._data);
            await this.saveRequest();
            console.log('Find template and check');
            if (await this.isValid(this._data)) {
                console.log('Validation OK ->  to next queue');
                await this.sendToNextQueue();
                await Validator.notification({success: true, event: this._data});
            }
        } catch (e) {
            console.log('Validation ERROR -> notification', e.message || e);
            await Validator.notification({success: false, event: e.message || e});
            throw e;
        }
    }

    private async saveRequest() {
        let event = new Events();
        event.event = Object.assign({}, this._data)
        return await getRepository(Events).save(event)
    }

    private async isValid(data) {
        console.log('validation check=>', data);
        return await this.validation.check(data);
    }

    private static async notification(info) {
        console.log('notification', info)
        //todo
        // send notification;
    }
}

export default new Validator();