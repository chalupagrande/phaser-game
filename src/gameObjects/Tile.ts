import { pickRandom } from "../utils";
import p5Types from 'p5'
import Board from "./Board";
import Ball from "./Ball";
import Player from "./Player";
import { PlayableTileTypeKeys, TileType, TileTypes } from "./TileTypes";


class Tile {
  p5: p5Types;
  position: p5Types.Vector;
  type: TileType;
  owner: Player;
  isPermanent: boolean = false;

  constructor(p5: p5Types, position:p5Types.Vector, owner: Player, type?: TileType){
    this.p5 = p5;
    this.position = position;
    this.type = type || pickRandom(PlayableTileTypeKeys);
    this.owner = owner;
    this.isPermanent = TileTypes[this.type]?.isPermanent || false;
  }

  render(tileSize:number, position?:p5Types.Vector){
    const p5 = this.p5;
    const color = !this.isPermanent && this.owner ? this.owner.color: TileTypes[this.type].color
    // render with player color
    p5.fill(color[0], color[1], color[2]);
    if(position) {
      p5.rect(position.x, position.y, tileSize, tileSize);
    } else {
      p5.rect(this.position.x * tileSize, this.position.y * tileSize, tileSize, tileSize);
    }
  }

  action(board:Board, ball:Ball) {
    const p5 = this.p5;
    const action = TileTypes[this.type].action
    return action(p5, board, ball, this)
  }
}

export default Tile