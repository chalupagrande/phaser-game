import React from 'react'
import { Tile } from '../../game/Tiles'
import './BankTile.css'

export const BankTile = ({tile}: {tile: Tile})=> {

  const direction = tile?.type || 'EMPTY'
  return (
    <div  className="bankTile">
      {direction}
    </div>
  )
}