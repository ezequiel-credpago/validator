import 'dotenv/config'
import SQSHelper from "./helpers/Sqs";
console.log('Enviando mensagem')
new SQSHelper().sendMessages({'teste': 'OK'}, 'http://149.56.180.29:4566/000000000000/payments').then(() => console.log('OK enviado'));
console.log('Feito')