import "reflect-metadata";
import 'dotenv/config'
import {createConnection} from "typeorm";
import sqs from "./queue/sqs";

createConnection().then(async () => {
    console.log('Running sqs')
    sqs.start();
}).catch(error => console.log(error));