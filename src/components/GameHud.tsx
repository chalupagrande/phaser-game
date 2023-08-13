import React, { useEffect } from 'react'
import { Scoreboard } from './Scoreboard'
import { emitter } from '../utils/Events'
import { Tile } from '../game/Tiles'
import { Banks } from './Banks'

export const GameHud  = ()=> {
  const [renderNumber, setRenderNumber] = React.useState(0)
  const [playerScores, setPlayerScores] = React.useState([0,0])
  const playerBanks = React.useRef<Tile[][]>([])


  useEffect(()=> {
    console.log("RUNNING USE EFFECT")
    emitter.on('goal', (player: number) => {
      console.log("GOAL", player, playerScores)
      const newScores = [...playerScores]
      newScores[player] += 1
      setPlayerScores(newScores)
    })

    emitter.on('updateBank', (player: number, bank: Tile[]) => {
      playerBanks.current[player] = bank
      setRenderNumber(renderNumber + 1)
    })
  }, [])

  console.log("RENDERING", renderNumber, playerScores, playerBanks.current)

  return (
    <div>
      {renderNumber}
      <Scoreboard scores={playerScores}/>
      <Banks banks={playerBanks.current}/>
    </div>
  )
}