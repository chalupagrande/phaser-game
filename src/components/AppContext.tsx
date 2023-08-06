import React from 'react'

const initialContextState = {
    width: 10,
    height: 10,
    tileSize: 50,
    players: 2,
    player1Bank: [],
    player2Bank: [],
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
