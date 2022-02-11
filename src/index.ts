import "reflect-metadata";
import 'dotenv/config'
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import * as cors from "cors"
createConnection().then(async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors())
    Routes.forEach(route => {
        (app as any)[route.method](route.route,route.middleware || [], (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });
    console.log('Running HTTP on port 3000')
    app.listen(3000);
}).catch(error => console.log(error));
