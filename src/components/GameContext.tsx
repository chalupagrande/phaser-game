import React from 'react'
import Ball from '../gameObjects/Ball'
import Board from '../gameObjects/Board'
import Player from '../gameObjects/Player'

export const initialGameSettings = {
  tileSize: 80,
  boardTileWidth: 5,
  boardTileHeight: 5,
  initialBallSpeed: 1,
  ballSize: 20,
}
export type GameSettings = typeof initialGameSettings


export const initialGameState ={
  players: [],
  board: undefined,
  ball: undefined,
}

export const initialGameContext = {
  gameState: initialGameState,
  gameSettings: initialGameSettings,
  updateGameState: (newGameState: any) => {},
  updateGameSettings: (newGameSettings: any) => {},
}


export type gameSettings = typeof initialGameSettings
export type GameState = {
  players?: Player[],
  board?: Board,
  ball?: Ball,
}

export const GameContext = React.createContext(initialGameContext)

export const GameContextProvider = ({children}: {children: React.ReactNode}) => {
  const [gameState, setGameState] = React.useState(initialGameState)
  const [gameSettings, setGameSettings] = React.useState(initialGameSettings)

  const updateGameState = (newGameState: any) => {
    setGameState({...gameState, ...newGameState})
  }

  const updateGameSettings = (newGameSettings: any) => {
    setGameSettings({...gameSettings, ...newGameSettings})
  }

  return (
    <GameContext.Provider value={{gameState, gameSettings, updateGameState, updateGameSettings}}>
      {children}
    </GameContext.Provider>
  )
}
