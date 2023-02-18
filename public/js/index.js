var socket = io();

socket.on("connect", function () {
  console.log("Connected to server");

  socket.emit("createMessage", {
    from: "mac@lain.com",
    to: "john@doe.com",
  });
});

socket.on("newMessage", function (message) {
  console.log("Message recieved from", message);
});

socket.on("disconnect"),
  function () {
    console.log("Disconnected from server");
  };
