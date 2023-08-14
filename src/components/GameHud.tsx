import React from 'react'
import { Scoreboard } from './Scoreboard'
import { Banks } from './Banks'
import { GameContext } from './GameContext'
import Player from '../game/Player'



export const GameHud  = ()=> {
  const gameState = React.useContext(GameContext)
  const players = gameState.players
  console.log("GAME STATE", gameState)
  const scores = players.map((p: Player) => p.score)
  const banks = players.map((p: Player) => p.bank)
  return (
    <div>
      <Scoreboard scores={scores}/>
      <Banks banks={banks}/>
    </div>
  )
}