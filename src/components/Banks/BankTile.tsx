import React from 'react'
import { Tile } from '../../game/Tiles'
import './BankTile.css'


export type BankTileProps = {
  tile?: Tile
}
export const BankTile = ({tile}: BankTileProps)=> {

  const direction = tile?.type || 'EMPTY'
  return (
    <div  className="bankTile">
      {direction}
    </div>
  )
}