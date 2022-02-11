import {Request} from "express";

export default class Commons {
    public async import_class(dir: string) {
        return await import(dir);
    }

    public request(request: Request) {
        return {...request.body, ...request.query, ...request.params}
    }
}