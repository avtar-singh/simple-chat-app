// IMPORT LIBRARIES
require("./config/config");
const path = require('path');
const express = require("express");
// INIT APP
var app = express();
// INIT SERVER and integrate app
const http = require("http").createServer(app);
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const {generateMessage} = require('./utils/message');
const io = socketIO(http);

http.keepAliveTimeout = 60 * 1000 + 1000;
http.headersTimeout = 60 * 1000 + 2000;

const port = process.env.PORT || 3000;

// LISTEN NEW SOCKET CONNECTION
io.on("connection", (socket) => {
  console.log("New User connected");

  // NEW USER - WELCOME - OWN Message
  socket.emit(
    "newMessage",
    generateMessage("Admin", "Welcome to the chat app")
  );

  // NEW USER - WELCOME - GROUP Message
  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New User joined")
  );

  // NEW USER - Create Message
  socket.on("createMessage", (message, cb) => {
    console.log("New message received:", message);
    // EMIT MESSAGE
    io.emit("newMessage", generateMessage(message.from, message.text));

    // Acknowledgement
    cb("Message recieved successfully");
  });

  socket.on("disconnect", (reason) => {
    console.log("Disconnected due to ", reason);
  });
});

// Serve Public Path
app.use(express.static(publicPath));

// Listen Requests
http.listen(port, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});