import { pickRandom } from "../../utils";
import p5Types from 'p5'
import Board from "../Board";
import Ball from "../Ball";
import Player from "../Player";
import { TileType, TileTypes } from "./TileTypes";





export class Tile {
  p5: p5Types;
  position: p5Types.Vector;
  type: TileType;
  velocity?: p5Types.Vector;
  owner?: Player;
  isPermanent: boolean = false;

  constructor(p5: p5Types, position:p5Types.Vector, owner?: Player, velocity?: p5Types.Vector, type?: TileType, isPermanent?:boolean,){
    this.p5 = p5;
    this.position = position;
    this.velocity = velocity;
    this.type = type || pickRandom(Object.keys(TileTypes) as TileType[]);
    this.owner = owner;
    this.isPermanent = TileTypes[this.type].isPermanent;
  }

  render(tileSize:number, position?:p5Types.Vector){
    const p5 = this.p5;
    const color = TileTypes[this.type].color
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
    action(p5, board, ball, this)
  }
}