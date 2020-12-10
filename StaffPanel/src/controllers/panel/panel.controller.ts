import express from 'express';
import { Request, Response } from 'express';

class PanelController {
    public path = '/panel'
    public router = express.Router()

    constructor(staffPanel: any) {
        this.router.get('/', (req: Request, res: Response) => {
            res.render("serverPanel", {
                user: {
                    name: "aLI a",
                    profile: "https://cdn.discordapp.com/avatars/384187414584754176/ed3992f490e04cacebf08710bbfe67b9.png?size=2048"
                },
                server: {
                    name: "Blaine County Country Roleplay",
                    statistics: {
                        players24hours: [
                            {
                                time: "Nov 12, 2020, 4:34 AM",
                                total: 6
                            },
                            {
                                time: "Nov 12, 2020, 4:46 AM",
                                total: 7
                            },
                            {
                                time: "Nov 12, 2020, 4:47 AM",
                                total: 8
                            },
                            {
                                time: "Nov 12, 2020, 4:56 AM",
                                total: 7
                            }
                        ],
                        regulars: 458,
                        new: 134,
                        playerHistory: [
                            10, 32, 9, 43, 44, 4, 40, 1
                        ],
                        warnings: {
                            history: [
                                7, 15, 17, 58, 48, 15, 26
                            ],
                            total: 216
                        },
                        kicks: {
                            history: [
                                5, 15, 25, 24, 16, 27, 45
                            ],
                            total: 216
                        },
                        bans: {
                            history: [
                                2, 5, 8, 4, 16, 34, 8
                            ],
                            total: 216
                        }
                    },
                    players: [
                        {
                            id: 1,
                            name: "Davis",
                            license: "lolimdavis",
                            profile: "https://cdn.discordapp.com/avatars/333774879184650250/77571d670af1747c7551d7a41bedc39c.png?size=2048",
                            ping: 16,
                            playtime: "1 day, 4 hours and 29 minutes",
                            trustScore: 99
                        }
                    ],
                    recentActivity: [
                        {
                            level: "timeline-success",
                            time: "4:45 PM",
                            activity: "D. Fox turned peace-time on"
                        },
                        {
                            level: "timeline-danger",
                            time: "4:56 PM",
                            activity: "Server crash detected"
                        }
                    ]
                }
            });
        });
    };
};

export default PanelController;