import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("send-message", (data) => {
    socket.broadcast.emit("message-from-server", data);
  });

  socket.on("typing-started", () => {
    socket.broadcast.emit("typing-started-from-server");
  });

  socket.on("typing-stopped", () => {
    socket.broadcast.emit("typing-stopped-from-server");
  });

  socket.on("join-room", ({ roomId }) => {
    console.log('Room joined => ', roomId)
    socket.join(roomId);
  });

  socket.on("disconnect", (skt) => {
    console.log("User left :(");
    // skt.broadcast.emit('user-disconnected');
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
