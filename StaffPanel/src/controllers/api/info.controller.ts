import express from 'express';
import { Request, Response } from 'express';

class InfoController {
    public path = '/api/info'
    public router = express.Router()
    public cache: any

    constructor(staffPanel: any) {
        this.router.get('/cache', (req: Request, res: Response) => {
            res.send(staffPanel.cache.data);
            staffPanel.cache.set("requestCount", (staffPanel.cache.get("requestCount") || 1) + 1);
        });
    };
};

export default InfoController;