import React from 'react'
import { Tile } from '../../gameObjects/Tiles'
import { BankTile } from './BankTile'
import './Bank.css'


const PlayerBank = ({playerNumber, bank}: {playerNumber: number, bank: (Tile | undefined)[]}) => {
  return (
    <div className="bank-wrapper column">
      <h3>Player {playerNumber}</h3>
      <div className='row'>
        {bank.map((tile, i)=> <BankTile key={i} tile={tile}/>)}
      </div>
    </div>
  )
}

export const Banks = ({banks}: {banks: (Tile | undefined)[][]})=> {  
  const bank1 = banks[0]
  const bank2 = banks[1]

  if(!bank1 || !bank2) return (<div>loading...</div>)

  return (
    <div className='row'>
      {banks.map((bank, i)=> <PlayerBank key={i} playerNumber={i+1} bank={bank}/>)}
    </div>
  )
}

