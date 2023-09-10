
import { useEffect, useRef, useState } from "react";
import { io, Socket} from "socket.io-client";

const Matchmaking = () => {
  const socketRef = useRef<Socket>();
  const [users, setUsers] = useState<number>(0)
  const [match, setMatch] = useState()
  const [matchNames, setMatchNames] = useState<string[]>([])
  const [username, setUsername] = useState<string | undefined>()

  const player = (match?.players || []).find((p: any) => p.name === username) 
  console.log("player", player)
  const amReady = player?.state === "ready"

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const username = (e.target as any).username.value
    setUsername(username)
    if(socketRef.current) {
      socketRef.current.emit("login", username)
    }
  }

  const handleCreateMatch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const matchName = (e.target as any).matchName.value
    if(socketRef.current) {
      socketRef.current.emit("create-match", matchName)
    }
  }

  const handleJoinGame = (matchName:string) => {
    if(socketRef.current) {
      socketRef.current.emit("join-match", matchName)
    }
  }

  const readyUp = () => {
    if(socketRef.current) {
      socketRef.current.emit("ready-up", match?.name)
    }
  }

  useEffect(() => {
    const socket: Socket = io("http://192.168.86.159:3001", {
      transports: ["websocket"],
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected to server");
    })

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.on("users", (numUsers: number) => {
      setUsers(numUsers)
    })
    socket.on("matches", (gs: any) => {
      setMatchNames(gs)
    })

    socket.on("match-joined", (g)=> {
      setMatch(g)
    })

    socket.on("match-ready", (g)=> {
      setMatch(g)
    })

    return () => {
      socketRef.current?.disconnect();
    };
  }, [])

  console.log("match", match)
  return (
    <div>
      <h1>Matchmaking</h1>
      <h4>Players Online: {users}</h4>
      <div>
        {!username && <form onSubmit={handleLogin}>
          <label htmlFor="username"></label>
          <input id="username"></input>
          <button type="submit">Join</button>
        </form>}

        {!!username && 
        <>
          {!match && <form onSubmit={handleCreateMatch}>
            <h3>Logged in as: {username}</h3>
            <h3>Create Match</h3>
            <label htmlFor="matchName"></label>
            <input id="matchName"></input>
            <button type="submit">Create</button>
          </form>}
          <h3>You are currently in: {match?.name}</h3>
          {match && match?.state === "waiting" && <h3>Waiting for other players...</h3>}
          {match?.state === "ready" && !amReady &&  <button onClick={readyUp}>Ready Up!!!</button>}
          <div className="row">
            <div>
              <h3>Matches</h3>
              <ul>
                {matchNames.map((name, i) => <li key={i}>{name} {!match && <button onClick={()=> handleJoinGame(name)}>Join</button>}</li>)}
              </ul>
            </div>
          </div>
        </>
        }
      </div>
    </div>
  )
}

export default Matchmaking