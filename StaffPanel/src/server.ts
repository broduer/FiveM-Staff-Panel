import App from './app';
import * as bodyParser from 'body-parser';
import cacheHandler from './services/cache';

import loggerMiddleware from './middlewares/logger';

// Controllers
import CommandsController from './controllers/api/commands.controller';
import InfoController from './controllers/api/info.controller';
import PlayerController from './controllers/api/player.controller';
import PanelController from './controllers/panel/panel.controller';
import PanelPlayerController from './controllers/panel/player.controller';
import HomeController from './controllers/home.controller';

const app = new App({
    port: 5000,
    controllers: [
        InfoController,
        CommandsController,
        PlayerController,
        PanelController,
        PanelPlayerController,
        HomeController
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
})

app.listen()