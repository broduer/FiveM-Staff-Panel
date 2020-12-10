import mongoose from 'mongoose';
import Client from './Bot/handlers/Client'
import express, { Application, Request, Response } from 'express'
import playerStats from './services/serverStats';
import sockets from './services/sockets';
import worker from './services/workers';
import cache from './services/cache'
import * as config from './config.json';
import passport from 'passport';
import Strategy from 'passport-discord';
import session from 'express-session'
import Logger from './services/Logger';
import { MessageEmbed } from 'discord.js';

class App {
    public app: Application
    public port: number
    public client: any
    public server: any;
    public io: any;
    public eventEmitter: any;
    public cache: any;
    public isAuthenticated: Function;
    public Logger: Function;
    public role: any;

    constructor(appInit: { port: number; middleWares: any; controllers: any; }) {
        this.cache = new cache()
        this.client = new Client({});

        this.client.on("ready", async () => {
            // this.client.guilds.cache.get("702556315699904604").roles.cache.get("779522700602638367").setHoist(true)
            // const role = await this.client.guilds.cache.get("702556315699904604").roles.create({
            //     data: {
            //         name: 'Jr. Owner',
            //         color: 'BLUE',
            //     },
            //     reason: 'we needed a role for super cool people'
            // });

            // role.setPosition(84)

            // this.client.guilds.cache.get("702556315699904604").roles.cache.find((role:any)=> role.id === "726276184194809887").edit({ name: '• Head Developer' })
            // this.client.guilds.cache.get("702556315699904604").members.cache.get("384187414584754176").setNickname("I like to be AFK")

            // this.client.guilds.cache.get("702556315699904604").members.cache.forEach((member:any) => {
            //     if (member.hasPermission(['ADMINISTRATOR'])) {
            //         console.log(`<@${member.user.id}>`)
            //     }

            //     this.client.guilds.cache.get("702556315699904604").members.cache.get("240943003877900288").roles.remove("702596068986060950")
            // })
            // const guild = this.client.guilds.cache.get("702556315699904604")
            // const embed = new MessageEmbed()
            //     .setColor("BLUE")
            //     .setThumbnail(guild.iconURL({ format: 'png' }))
            //     .addField("❯ How can I become a LEO?", "If you would like to join a whitelisted department you can submit an application [here](https://blaineccrp.com/).")
            //     .addField("❯ How can I register in the cad?", "When joining our cad just simply go to [Sonoran CAD](https://app.sonorancad.com/), login or create an account then simple just join our cad by entering the ID blaineccrp and civ has the permission key.")
            //     .addField("❯ How can I join the staff team?", "We are always looking for new staff members! You can submit an application for staff [here](https://blaineccrp.com/).")
            //     .addField("❯ I would like to report a staff member, how can I do this?", "Please keep in mind reporting a staff member will not be taken lightly and you will need evidence backing your report. So use the name or discord name if you know it and the reason for the report we will contact you. You can report the staff member [here](https://blaineccrp.com/)")
            //     .addField("❯ What's the TeamSpeak IP?", "Our TeamSpeak IP is `ts3.bccrp.xyz`")
            //     .addField("❯ What's the FiveM server's IP?", "You can join our server by pressing f8 and typing `connect fs1.bccrp.xyz`")
            //     .addField("❯ Contact Information?", "» Development: <@384187414584754176>\n» Staff: <@333774879184650250> or <@282047521235271680>\n» Gangs: <@292711012384374794>\n» Departments: <@765218270952292402>  or <@435250924773179403>\n» Donations: <@619700453952847892> or <@&707268136126382114>");

            //     guild.channels.cache.get("731882122062594098").send(embed)

            // const guild = this.client.guilds.cache.get("702556315699904604")
            // const embed = new MessageEmbed()
            //     .setColor("BLUE")
            //     .setThumbnail(guild.iconURL({ format: 'png' }))
            //     .addField("❯ Where can I donate?", "Donations can be paid through PayPal from [Tebex](https://backwoodsbccrp.tebex.io/)")
            //     .addField("❯ Donation Packages and Prices?", "• VIP - Monthly: $15 USD a Month.\n• VIP - 6 Months: $60 USD every 6 Months.\n• VIP Lifetime: $100 USD.\n•Queue Priority $50USD")
            //     .addField("❯ What Does VIP Include?", "• Unlimited Stamina\n• Dry Player\n• Wet Player\n• Keep Clean\n• Personal Vehicle Options Menu\n• No Ragdoll• And Much More!\n• Realistic Vehicles")
            //     .addField("❯ Other Info?", "• VIP players CAN use someone's donator vehicle only with the permission of the owner of the donator vehicle.")
            //     .addField("❯ Donator TOS?", "```1) We do not alter the speeds of any vehicle or edit the looks of your Personal vehicle.\n2) If you own an Personal vehicle/ Donator vehicle you can only give players who are VIP, or Staff access to it.\n3) Once you buy a donator vehicle you cannot get it changed or removed. Therefore no trades, or switching so make sure the one your pick is the one you want there will be no trading in.\n4) You are not allowed to make profit/sell access to your own private vehicles, you are not to ask an user to purchase their vehicle.\n5) You cannot spawn anyone's donator vehicles unless you have been given access by the owner of the vehicle.\n6) You cannot let anyone who isn't a VIP or Staff drive Add-on vehicles.\n7) Chargebacks are not allowed, if you are caught doing so, your perms or vehicles will be removed\n8) Being a donator/VIP does not mean you can't get banned, being a donator does not have special permissions if you get banned for breaking the rules. It will result in a violation of T.O.S.```")
            //     .addField("❯ What does this mean?", "```By reading this you are agreeing to the Blaine County Country Roleplay T-O-S, if you are caught breaking any of these rules you will be handled as any other member.\nViolation of these T.O.S will result in a removal of your donator package, such as your donator perms ingame and on Discord and any donator vehicles you purchased.```")
            //     guild.channels.cache.get("707667115380965477").send(embed)
            // });

            const guild = this.client.guilds.cache.get("702556315699904604")
            const embed = new MessageEmbed()
                .setColor("BLUE")
                .setThumbnail(guild.iconURL({ format: 'png' }))
                .addField("❯ Server Donations:", "If anyone would like to support what we do check the link below there's no minimum No one is required to donate. This is all voluntary. It does cost a bit to manage and run a server but we will be doing our best to make this server perfect for you all. Keep in mind this is only a support to the server. **THIS IS NOT PART OF VIP & IN-GAME PERKS !** You can donate [here](https://backwoodsbccrp.tebex.io/).")

                guild.channels.cache.get("708818474826465290").send(embed)
            });
        this.app = express();
        this.port = appInit.port;
        this.Logger = Logger;
        this.server = require('http').createServer(this.app);

        // Connected to MongoDB server
        mongoose.connect(config.mongodb, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }, () => {
             this.client.logger("Connected to the MongoDB database!");
         });

        // Event Handler
        const EventEmitter = require('events');
        this.eventEmitter = new EventEmitter();

        // Socket.io
        this.io = sockets(this);

        // Workers
        new worker(this)

        // Passport
        this.app.use(session({
            secret: config.passport.secret,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 24 * 60 * 60 * 365 * 1000
            }
        }));

        this.app.use(passport.initialize());
        this.app.use(passport.session());

        passport.serializeUser((user:any, done:any) => done(null, user));
        passport.deserializeUser((user:any, done:any) => done(null, user));

        passport.use(new Strategy.Strategy({
            clientID: config.passport.clientID,
            clientSecret: config.passport.clientSecret,
            callbackURL: config.passport.callbackURL,
            scope: ["identify"]
        }, (accessToken:any, refreshToken:any, profile:any, done:any) => {
            process.nextTick(() => {
                return done(null, profile);
            });
        }));

        // Auth
        this.isAuthenticated = function(req:Request, res:Response, next:any) {
            if (!req.isAuthenticated()) return res.redirect("/login");
            next();
        };

        this.middlewares(appInit.middleWares)
        this.routes(appInit.controllers)
        this.assets()
        this.template()

        // Random Components
        playerStats(this);
    };

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare);
        });
    };

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            const initController = new controller(this);
            this.app.use(initController.path, initController.router);
        });
    };

    private assets() {
        this.app.use(express.static('public'));
        this.app.use(express.static('views'));
    };

    private template() {
        this.app.set('view engine', 'ejs');
    };

    public listen() {
        this.server.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`);
        });
    };
};

export default App;