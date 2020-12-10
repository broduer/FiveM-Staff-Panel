import Logger from './Logger';
import * as config from '../config.json';
import SocketIO from 'socket.io'

const connections = new Map<string, SocketIO.Socket>()

class Sockets {

    static connect(App:any) {
        const io = require('socket.io')(App.server, {
            path: '/socket'
        });

        io.use(function(socket:any, next:any) {
            const handshakeData = socket.request;

            if (handshakeData._query["authentication"] !== config.authentication) {
                App.eventEmitter.emit("socketUnauthorizedAccess");
                return Logger("Unauthorized socket connection.");
            };

            next();
        });

        io.on('connection', function(client:any) {
            connections.set(client.id, client);

            App.eventEmitter.emit("socketConnection", client);
            client.on('disconnect', () => App.eventEmitter.emit("socketDisconnected"));
            client.on("playerConnected", (player: any) => App.eventEmitter.emit("playerConnected", player));
            client.on("playerDisconnected", (player: any) => App.eventEmitter.emit("playerDisconnected", player));
            client.on("messageLog", (data: any) => App.eventEmitter.emit("messageLog", data));
            client.on("commandRan", (data: any) => App.eventEmitter.emit("commandRan", data));
            client.on("moderationCommand", (data: any) => App.eventEmitter.emit("moderationCommand", data));
            client.on("playerReport", (data: any) => App.eventEmitter.emit("playerReport", data));
            client.on("callStaff", (data: any) => App.eventEmitter.emit("callStaff", data));
            client.on("playerList", (data: any) => App.eventEmitter.emit("playerList", data))
        });

        return io
    };

    public broadcast(msg: string) {
        for(const socket of connections.values()) {
             socket.emit("block", msg, (confirm: string) => {
                  console.log("confirmation msg: ", confirm)
             })
         }
     }
};

export default Sockets.connect;