import React, {useState} from 'react'
import './App.css'
import Game from './game/Game'
import {Header} from './components/Header'
import {Settings} from './components/Settings'
import {Banks} from './components/Banks'
import { AppContextProvider } from './components/AppContext'

function App() {
  return (
    <div>
      <AppContextProvider>
        <Header/>
        <Settings/>
        <Banks/>
      </AppContextProvider>
      <Game/>
    </div>
  )
}

export default App
