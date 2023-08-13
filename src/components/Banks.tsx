import React from 'react'
import {AppContext} from './AppContext'

export const Banks = ()=> {
  const {ctx} = React.useContext(AppContext)
  console.log(ctx.player1Bank)
  return (
    <div>
      <h1>Banks</h1>
      {ctx.player1Bank.length}
      vs
      {ctx.player2Bank.length}
    </div>
  )
}