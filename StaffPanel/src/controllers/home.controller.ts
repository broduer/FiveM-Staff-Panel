import express from 'express'
import { Request, Response } from 'express'
import passport from 'passport';

class HomeController {
    public path = '/'
    public router = express.Router()

    constructor(staffPanel: any) {
        this.router.get('/', staffPanel.isAuthenticated, (req: Request, res: Response) => {
            res.redirect("/panel");
        });

        this.router.get("/login", passport.authenticate("discord", {
            scope: ["identify"]
        }), (req, res, next) => {});

        this.router.get("/dashboard/callback", passport.authenticate("discord", { failureRedirect: "/login" }), async (req, res, next) => {
            res.redirect("/panel");
        });

        this.router.get("/logout", staffPanel.isAuthenticated, (req, res) => {
            req.logout();
            res.redirect("/login");
        });
    };
};

export default HomeController;