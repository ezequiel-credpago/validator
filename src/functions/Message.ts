import validator from "./Validator";

class Message {
    message(message) {
        console.log('message', message);
    }

    messageReceived(message) {
        try {
            validator.setData(JSON.parse(message.body)).execute().then(r => console.log('SQS processed'))
        } catch (e) {
            console.log('ERROR', e.message || e);
        }
    }

    error(err) {
        console.log('err', err);
    }

    processingError(err) {
        console.log('err', err);
    }
}

export default new Message();