import express, { response } from 'express';
import { Request, Response } from 'express';

class PlayerController {
    public path = '/api/player/'
    public router = express.Router();
    // public data: any

    constructor(staffPanel: any) {
        this.router.get('/players', (req: Request, res: Response) => {
            staffPanel.io.emit("getPlayers", "test", (response: any) => {
                res.send(response);
            });
        });
    };
};

export default PlayerController;