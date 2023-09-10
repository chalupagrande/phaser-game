import { io, Socket} from "socket.io-client";

const socket: Socket = io("http://192.168.86.159:3001", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("Connected to server");
})

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

socket.on("users", (users) => {
  console.log(users);
})

export {socket}