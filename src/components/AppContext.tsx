import React from 'react'
import { Tile } from '../game/Tiles'

const initialContextState = {
  playerBanks: [[],[]],
  playerScores: [0,0]
}

export const AppContext = React.createContext({ctx: initialContextState, update: (newCtx: {}) => {}})

type AppProviderProps = {children: React.ReactNode}

export const AppContextProvider = ({children}: AppProviderProps)=> {
  const [ctx, setCtx] = React.useState(initialContextState)
  const update = (newContext: {}) => {
    setCtx({...ctx, ...newContext})
  }

  return (
    <AppContext.Provider value={{ctx, update}}>
      {children}
    </AppContext.Provider>
  )
}
