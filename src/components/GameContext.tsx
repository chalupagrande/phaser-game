import React from 'react'

export const initialGameState = {
  players: [],
  board: [],
  ball: null,
  updateGameContext: (newGameState: any) => {},
}

export const GameContext = React.createContext(initialGameState)

export const GameContextProvider = ({children}: {children: React.ReactNode}) => {
  const [gameState, setGameState] = React.useState(initialGameState)

  const updateGameContext = (newGameState: any) => {
    setGameState({...gameState, ...newGameState})
  }

  return (
    <GameContext.Provider value={{...gameState, updateGameContext}}>
      {children}
    </GameContext.Provider>
  )
}
