import { pickRandom } from "../../utils";
import p5Types from 'p5'
import Board from "../Board";
import Ball from "../Ball";
import Player from "../Player";
import {emitter} from '../../utils/Events'

const TileTypes = {
  "up": {
    color: [255,0,0],
    action: (p5:p5Types, board:Board, ball:Ball, tile:Tile) => {
      ball.direction = p5.createVector(0,-1)
    }
  }, 
  // "right": {
  //   color: [0,255,0],
  //   action: (p5:p5Types, board:Board, ball:Ball, tile:Tile) => {
  //     ball.direction = p5.createVector(1,0)
  //   }
  // }, 
  // "down": {
  //   color: [0,0,255],
  //   action: (p5:p5Types, board:Board, ball:Ball, tile:Tile) => {
  //     ball.direction = p5.createVector(0,1)
  //   }
  // }, 
  // "left": {
  //   color: [0,255,255],
  //   action: (p5:p5Types, board:Board, ball:Ball, tile:Tile) => {
  //     ball.direction = p5.createVector(-1,0)
  //   }
  // }, 
  "goal": {
    color: [0, 255, 255],
    action: (p5:p5Types, board:Board, ball:Ball, tile:Tile) => {
      emitter.emit('goal', tile?.owner?.playerId)
    }
  }, 
  // "wall": {
  //   color: [0,0,0],
  //   action: (p5:p5Types, board:Board, ball:Ball, tile:Tile) => {
  //     console.log(tile)
  //   }
  // }
} as const;

export type TileType = keyof typeof TileTypes;

export class Tile {
  p5: p5Types;
  position: p5Types.Vector;
  type: TileType;
  velocity?: p5Types.Vector;
  isPermanent?: boolean = true;
  owner?: Player;

  constructor(p5: p5Types, position:p5Types.Vector, owner?: Player, velocity?: p5Types.Vector, type?: TileType, isPermanent?:boolean,){
    this.p5 = p5;
    this.position = position;
    this.velocity = velocity;
    this.type = type || pickRandom(Object.keys(TileTypes) as TileType[]);
    this.isPermanent = isPermanent;
    this.owner = owner;
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