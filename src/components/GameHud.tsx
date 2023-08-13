import React, { useEffect } from 'react'
import { Scoreboard } from './Scoreboard'
import { emitter } from '../utils/Events'

export const GameHud  = ()=> {
  const [playerScores, setPlayerScores] = React.useState([0,0])
  useEffect(()=> {
    emitter.on('goal', (player: number) => {
      const newScores = [...playerScores]
      newScores[player]++
      setPlayerScores(newScores)
    })
  }, [])

  return (
    <div>
      <Scoreboard scores={playerScores}/>
      
    </div>
  )
}