import React, { useEffect } from 'react'
import { Scoreboard } from './Scoreboard'
import { emitter } from '../utils/Events'
import { Tile } from '../game/Tiles'
import { Banks } from './Banks'



export const GameHud  = ()=> {
  const [playerScores, setPlayerScores] = React.useState([0,0])
  const [playerBanks, setPlayerBanks] = React.useState<Tile[][]>([])

  const updateScore = (player: number) => {
    const newScores = [...playerScores]
    newScores[player] = playerScores[player] + 1
    setPlayerScores(newScores)
  }

  useEffect(()=> {
    const unbindGoal = emitter.on('goal', (player: number) => {
      updateScore(player)
    })

    const unbindBank = emitter.on('updateBank', (player: number, bank: Tile[]) => {
      const newBanks = [...playerBanks]
      newBanks[player] = bank
      setPlayerBanks(newBanks)
    })

    return () => {
      unbindBank()
      unbindGoal()
    }
  })

  console.log(emitter.events)

  return (
    <div>
      <Scoreboard scores={playerScores}/>
      <Banks banks={playerBanks}/>
    </div>
  )
}