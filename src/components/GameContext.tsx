import React from 'react'
import Ball from '../game/Ball'
import Board from '../game/Board'
import Player from '../game/Player'

export const initialGameOptions = {
  tileSize: 50,
  boardTileWidth: 5,
  boardTileHeight: 5,
  initialBallSpeed: 1
}
export const initialGameState ={
  players: [],
  board: undefined,
  ball: undefined,
}

export const initialGameContext = {
  gameState: initialGameState,
  gameOptions: initialGameOptions,
  updateGameState: (newGameState: any) => {},
  updateGameOptions: (newGameOptions: any) => {},
}


export type GameOptions = typeof initialGameOptions
export type GameState = {
  players?: Player[],
  board?: Board,
  ball?: Ball,
}

export const GameContext = React.createContext(initialGameContext)

export const GameContextProvider = ({children}: {children: React.ReactNode}) => {
  const [gameState, setGameState] = React.useState(initialGameState)
  const [gameOptions, setGameOptions] = React.useState(initialGameOptions)

  const updateGameState = (newGameState: any) => {
    setGameState({...gameState, ...newGameState})
  }

  const updateGameOptions = (newGameOptions: any) => {
    setGameOptions({...gameOptions, ...newGameOptions})
  }

  return (
    <GameContext.Provider value={{gameState, gameOptions, updateGameState, updateGameOptions}}>
      {children}
    </GameContext.Provider>
  )
}
