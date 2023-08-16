import { Link } from 'wouter'
import { GameHud } from '../components/GameHud'
import GameSketch from '../components/GameSketch'

const GameScreen = () => {
  return (
    <div>
      <Link href="/"><a className="start">Reset Game</a></Link>
      <GameHud/>
      <GameSketch/>
    </div>
  )
}

export default GameScreen