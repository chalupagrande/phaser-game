
import {socket} from '../utils/Socket'


const Matchmaking = () => {
  console.log("SOCKET", socket)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const username = (e.target as any).username.value
    console.log("username", username)
    socket.emit("login", username)
  }

  return (
    <div>
      <h1>Matchmaking</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username"></label>
          <input id="username"></input>
          <button type="submit">Join</button>
        </form>
        
        <h3>PLayers Online</h3>
        <ul>
          <li>PLayer Name</li>
        </ul>
      </div>
    </div>
  )
}

export default Matchmaking