import Tile from '../../gameObjects/Tile'
import './Bank.css'


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