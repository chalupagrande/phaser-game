import { Link} from 'wouter'

const StartScreen = () => {
  return (
    <div>
      <h1>Phaser</h1>
      <ul className="column">
        <Link href="/game"><a className="start">Start Game</a></Link>
        <Link href="/matchmaking"><a className="start">Multiplayer</a></Link>
        <Link href="/settings"><a className="start">Settings</a></Link>
      </ul>
    </div>
  )
}

export default StartScreen