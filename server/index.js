import express from 'express';
import { Server } from "socket.io";
import http from "http";
import path from 'path';
import cors from 'cors'
import Match, {MATCH_STATES} from './Match.js'
import Player from './Player.js'


const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors()) 

const server = http.createServer(app);
const io = new Server(3001, server, {});


app.use(express.static(path.join("dist")))
const matches = []

io.on("connection", async (socket) => {
  const sockets = await io.fetchSockets()
  socket.emit("users", sockets.length)

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    matches.filter(match => {
      if(socket.PLAYER) {
        match.removePlayer(socket.PLAYER)
      }
      if(match.players.length === 0) {
        matches.splice(matches.indexOf(match), 1)
      }
    })
    socket.emit("users", sockets.length)
  })

  socket.on("matches", ()=> {
    socket.emit("matches", matches)
  })

  socket.on("login", async (username) => {
    const player = new Player(username, socket.id)
    socket.PLAYER = player
    const sockets = await io.fetchSockets()
    socket.emit("users", sockets.length)
    socket.emit("matches", matches.map(match => match.name))
  })

  socket.on("create-match", (matchName) => {
    socket.join(matchName)
    const match = new Match(matchName)
    match.addPlayer(socket.PLAYER)
    matches.push(match)
    socket.emit("match-joined", match)
    io.emit("matches", matches.map(match => match.name))
  })

  socket.on("join-match", (matchName) => {
    socket.join(matchName)
    const match = matches.find(game => game.name === matchName)
    console.log("MATCH", match, socket.PLAYER)
    match.addPlayer(socket.PLAYER)
    io.to(matchName).emit("match-joined", matchName)
    if(match.players.length === 2) {
      match.state = MATCH_STATES.READY
      io.to(matchName).emit("match-ready", match)
    }
  })

  socket.on("ready-up", (matchName) => {
    console.log("NAME", matchName)
    const match = matches.find(game => game.name === matchName)
    console.log("MATCH@@@@@@@", match, socket.PLAYER)
    socket.PLAYER.readyUp()
    const playersAreReady = match.players.reduce((acc, player) => acc && player.state === "ready", true)
    console.log("PLAYERS ARE READY", playersAreReady)
    if(playersAreReady) {
      console.log("PLAYERS ARE READY")
    }
    io.to(matchName).emit("match-ready", match)
  })
})

app.get("/", (req, res) => {
  res.send(io);
})

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
})
