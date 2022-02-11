import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Events} from "../entity/Events";
import Validator from "../functions/Validator";
import Commons from "../helpers/Commons";

export class EventsController {
    private eventsRepository = getRepository(Events);
    private validator = Validator;
    private commons = new Commons();

    async save(request: Request, response: Response, next: NextFunction) {
        try {
            console.log('Initialize save validator event')
            await this.validator.setData(this.commons.request(request)).execute()
            console.log('Finished validation')
            return {response: 'OK'}
        } catch (e) {
            return {response: 'ERROR', info: e.message || e}
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        try {
            const params = this.commons.request(request) as any;
            const event = await this.eventsRepository.findOneOrFail(params.id)
            return {response: {event: event}}
        } catch (e) {
            return {response: 'ERROR', info: e.message || e}
        }
    }

    async all(request: Request, response: Response, next: NextFunction) {
        try {
            const params = this.commons.request(request) as any;
            const take = params.take || 100
            const skip = params.skip || 0
            const [events, total] = await this.eventsRepository.findAndCount({take: take, skip: skip});
            return {events: events, count: total}
        } catch (e) {
            return {response: 'ERROR', info: e.message || e}
        }
    }
}