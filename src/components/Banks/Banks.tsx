import React from 'react'
import { Tile } from '../../game/Tiles'
import { BankTile } from './BankTile'

export const Banks = ({banks}: {banks: Tile[][]})=> {
  
  const bank1 = banks[0]
  const bank2 = banks[1]

  if(!bank1 || !bank2) return (<div>loading...</div>)

  return (
    <div>
      <h1>Banks</h1>
      <div style={{display: 'flex', flexDirection: 'row'}}>
      {bank1.map((tile, i)=> <BankTile key={i} tile={tile}/>)}
      <br/>
      vs
      {bank2.map((tile, i)=> <BankTile key={i} tile={tile}/>)}
      </div>
    </div>
  )
}