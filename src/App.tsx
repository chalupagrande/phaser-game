import './App.css'
import Match from './game/Match'
import Player from './game/Player'
import Board from './game/Board'
import { Position } from './utils'
import Game from './game/Game'

function App() {
  const player1 = new Player(new Position(0,0))
  const player2 = new Player(new Position(0,0))
  const board = new Board(10, 10)
  const match = new Match(10, [player1, player2], board)
  console.log(match)


  return (
    <>
     <div>HELLO </div>
     <Game/>
    </>
  )
}

export default App
