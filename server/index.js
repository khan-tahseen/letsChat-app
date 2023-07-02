import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import sockets from "./sockets/routes.js";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", sockets )

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
