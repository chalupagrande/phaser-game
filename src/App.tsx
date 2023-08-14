import React from 'react'
import './App.css'
import Game from './game/Game'
import { GameHud } from './components/GameHud'
import { GameContextProvider } from './components/GameContext'

function App() {  
  return (
    <GameContextProvider>
      <div>
        <GameHud/>
        <Game/>
      </div>
    </GameContextProvider>
  )
}

export default App
