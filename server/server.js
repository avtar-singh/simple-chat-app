require("./config/config");
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const express = require('express');

// INIT APP
var app = express();
// INIT SERVER and integrate app
var server = http.createServer(app);
// INIT Input/Output on Server
var io = socketIO(server);

// LISTEN NEW SOCKET CONNECTION
io.on('connection', (socket) => {
    console.log("New User connected");

    socket.emit("newMessage", {
        from: "john@doe.com",
        to: "mac@lain.com",
        createdAt: new Date().toDateString()
    });

    socket.on("createMessage", (newMessage) => {
        console.log("New message received:", newMessage);
    });

    socket.on("disconnect", (reason) => {
      console.log("Disconnected due to ", reason);
    });
});

app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});