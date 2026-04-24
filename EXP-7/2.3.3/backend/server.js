const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let users = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (username) => {
    users[socket.id] = username;

    io.emit("system", `${username} joined the chat`);
    io.emit("users", Object.values(users));
  });

  socket.on("message", (data) => {
    io.emit("message", data);
  });

  socket.on("typing", (username) => {
    socket.broadcast.emit("typing", username);
  });

  socket.on("disconnect", () => {
    const username = users[socket.id];
    delete users[socket.id];

    io.emit("system", `${username} left the chat`);
    io.emit("users", Object.values(users));
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});