import express from 'express';
import { Request, Response } from 'express';

class PlayerController  {
    public path = '/panel/player'
    public router = express.Router()

    constructor(staffPanel: any) {
        this.router.get('/', (req: Request, res: Response) => {
            res.send("Welcome!");
        });
    };
};

export default PlayerController;