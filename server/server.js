// IMPORT LIBRARIES
require("./config/config");
const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const {generateMessage} = require('./utils/message');

// INIT APP
var app = express();

// Serve Public Path
app.use(express.static(publicPath));
// Parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// INIT SERVER and integrate app
var server = http.createServer(app);
// INIT Input/Output on Server
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// LISTEN NEW SOCKET CONNECTION
io.on('connection', (socket) => {
    console.log("New User connected");

    // NEW USER - WELCOME - OWN Message
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // NEW USER - WELCOME - GROUP Message
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined'));

    // NEW USER - Create Message
    socket.on("createMessage", (message, cb) => {
        console.log("New message received:", message);
        // EMIT MESSAGE
        io.emit("newMessage", generateMessage(message.from, message.text));

        // Acknowledgement
        cb('Message recieved successfully');
    });

    socket.on("disconnect", (reason) => {
      console.log("Disconnected due to ", reason);
    });
});

// Listen Requests
server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});