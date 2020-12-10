import playerConnected from './Actions/playerConnected';
import playerDisconnected from './Actions/playerDisconnected';
import messageLog from './Actions/messageLog';
import commandRan from './Actions/commandRan';
import moderationCommand from './Actions/moderationCommand';
import playerReport from './Actions/playerReport';
import callStaff from './Actions/callStaff';
import socketConnection from './Actions/socketConnection';

class PanelWorker {
    public client: any;

    constructor(App: any) {
        App.eventEmitter.on("playerConnected", (data: object) => new playerConnected().handel(App, data));
        App.eventEmitter.on("playerDisconnected", (data: object) => new playerDisconnected().handel(App, data));
        App.eventEmitter.on("messageLog", (data: object) => new messageLog().handel(App, data));
        App.eventEmitter.on("commandRan", (data: object) => new commandRan().handel(App, data));
        App.eventEmitter.on("moderationCommand", (data: object) => new moderationCommand().handel(App, data));
        App.eventEmitter.on("playerReport", (data: object) => new playerReport().handel(App, data));
        App.eventEmitter.on("callStaff", (data: object) => new callStaff().handel(App, data));
        App.eventEmitter.on("socketConnection", (data: object) => new socketConnection().handel(App, data));
    };
};

export default PanelWorker;