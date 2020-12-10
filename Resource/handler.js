const ioClient = require('socket.io-client');
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("ok")
})

app.listen(5001, () => console.log("express server started on port 5000"));

const clientAddr = 'http://localhost:5000';
const socket = ioClient(clientAddr, {
    path: '/socket', query: "authentication=testtoken"
});

socket.on('connect', (data) => {
    console.log(`connected to ${clientAddr}`);

    socket.emit('playerConnected', {
        id: 2,
        name: "Ali A",
        identifiers: {
            license: "myCoolLicense",
            steam: "myCoolLicense",
            ip: "144.172.70.233"
        }
    });
});

socket.on("getPlayers", (data, callback) => {
    console.log("gg")
});