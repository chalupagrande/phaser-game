import React from 'react'
import './App.css'
import Game from './game/Game'
import { GameHud } from './components/GameHud'

function App() {  
  return (
    <div>
      <GameHud/>
      <Game/>
    </div>
  )
}

export default App
