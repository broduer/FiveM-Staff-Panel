import express from 'express';
import { Request, Response } from 'express';

class CommandsController {
    public path = '/api/commands'
    public router = express.Router()

    constructor(staffPanel: any) {
        this.router.get('/', (req: Request, res: Response) => {
            res.send("Welcome!");
        });
    };
};

export default CommandsController;