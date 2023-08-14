import React from 'react'

export const initialGameState = {
  players: [],
  board: [],
  ball: null,
  scores:[],
  banks: [],
  updateContext: (newGameState: any) => {},
}

export const GameContext = React.createContext(initialGameState)

export const GameContextProvider = ({children}: {children: React.ReactNode}) => {
  const [gameState, setGameState] = React.useState(initialGameState)

  const updateContext = (newGameState: any) => {
    setGameState({...gameState, ...newGameState})
  }

  return (
    <GameContext.Provider value={{...gameState, updateContext}}>
      {children}
    </GameContext.Provider>
  )
}
