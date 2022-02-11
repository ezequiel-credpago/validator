import {NextFunction, Request, Response} from "express";

class Auth {
    public isAuthenticated(req: Request, res: Response, next: NextFunction) {
        next()
    }
}

export default new Auth();