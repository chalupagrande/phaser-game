import { Link } from 'wouter'
import { GameHud } from '../components/GameHud'
import Game from '../game/Game'

const GameScreen = () => {
  return (
    <div>
      <Link href="/"><a className="start">Reset Game</a></Link>
      <GameHud/>
      <Game/>
    </div>
  )
}

export default GameScreen