import express from 'express';
import { Server } from "socket.io";
import http from "http";
import path from 'path'
import cors from 'cors'

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors()) 

const server = http.createServer(app);
const io = new Server(3001, server, {});


app.use(express.static(path.join("dist")))


io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("message", (msg) => {
    console.log(msg)
  })
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  })

  socket.on("login", (username) => {
    socket.username = username
    io.fetchSockets().then((sockets) => {
      io.emit("users", sockets.map((s) => s.username))
    })
  })
})

app.get("/", (req, res) => {
  res.send(io);
})

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
})
