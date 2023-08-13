import React from 'react'

export const Scoreboard = ({scores}: {scores: number[]})=> {
  console.log("RENDERING SCORES", scores)
  return (
    <div>
      <h1>Score</h1>
      p1: {scores[0]}<br/>
      p2: {scores[1]}
    </div>
  )
}