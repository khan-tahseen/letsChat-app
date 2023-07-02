import RoomController from "./controllers/RoomController.js";
import TypingController from "./controllers/TypingController.js";

const sockets = (socket) => {
  const typingController = new TypingController(socket);
  const roomController = new RoomController(socket);

  socket.on("send-message", (data, roomId) => {
    // let skt = socket.broadcast;
    // skt = roomId ? skt.to(roomId) : skt;
    socket.broadcast.emit("message-from-server", data);
  });

  socket.on("typing-started", typingController.typingStarted);

  socket.on("typing-stopped", typingController.typingStopped);

  socket.on("join-room", roomController.joinRoom);

  socket.on("disconnect", (skt) => {
    console.log("User left :(");
    // skt.broadcast.emit('user-disconnected');
  });
};

export default sockets;
