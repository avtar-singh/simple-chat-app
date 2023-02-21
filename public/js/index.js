var socket = io();

// Socket - Connect
socket.on("connect", function () {
  console.log("Connected to server");

});

// Socket - New Message
socket.on("newMessage", function (message) {
  console.log("Message recieved from", message);
  // Create new element
  var li = jQuery('<li></li>');
  // Attach message
  li.text(`${message.from} : ${message.text}`);
  // Add new element
  jQuery("#messages").append(li);
});

// Socket - Disconnect
socket.on("disconnect"),
  function () {
    console.log("Disconnected from server");
  };

jQuery("#message-form").on('submit', function(e) {
  e.preventDefault();
  socket.emit(
    "createMessage",
    {
      from: jQuery("[name=user]").val(),
      text: jQuery("[name=message]").val(),
    },
    function (data) {
      console.log(data);
    }
  );

});