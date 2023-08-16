import React from 'react'
import { Scoreboard } from './Scoreboard'
import { Banks } from './Banks'
import { GameContext } from './GameContext'
import Player from '../gameObjects/Player'



export const GameHud  = ()=> {
  const {gameState} = React.useContext(GameContext)
  const players = gameState.players
  const scores = players.map((p: Player) => p.score)
  const banks = players.map((p: Player) => p.bank)
  return (
    <div>
      <Scoreboard scores={scores}/>
      <Banks banks={banks}/>
    </div>
  )
}