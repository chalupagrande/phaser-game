import React, { useEffect } from 'react'
import { Scoreboard } from './Scoreboard'
import { emitter } from '../utils/Events'
import { Tile } from '../game/Tiles'
import { Banks } from './Banks'



export const GameHud  = ()=> {
  const [playerScores, setPlayerScores] = React.useState([0,0])
  const [playerBanks, setPlayerBanks] = React.useState<Tile[][]>([])


  useEffect(()=> {
    emitter.on('goal', (player: number) => {
      console.log("GOAL", player, playerScores)
      const newScores = [...playerScores]
      newScores[player] += 1
      setPlayerScores(newScores)
    })

    emitter.on('updateBank', (player: number, bank: Tile[]) => {
      const newBanks = [...playerBanks]
      newBanks[player] = bank
      setPlayerBanks(newBanks)
    })
  })

  return (
    <div>
      <Scoreboard scores={playerScores}/>
      <Banks banks={playerBanks}/>
    </div>
  )
}