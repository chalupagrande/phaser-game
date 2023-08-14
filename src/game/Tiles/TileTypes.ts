import p5Types from "p5";
import Board from "../Board";
import Ball from "../Ball";
import { Tile } from ".";

// TODO: figure out how to make this the type of TileTypes object
// to ensure type safety
type TileTypeType = {
  color: number[],
  isPermanent: boolean,
  action: (p5:p5Types, board:Board, ball:Ball, tile:Tile) => void
}


export const TileTypes = {
  "up": {
    color: [255,0,0],
    isPermanent: false,
    action: (p5:p5Types, board:Board, ball:Ball, tile:Tile) => {
      ball.direction = p5.createVector(0,-1)
    }
  }, 
  "right": {
    color: [0,255,0],
    isPermanent: false,
    action: (p5:p5Types, board:Board, ball:Ball, tile:Tile) => {
      ball.direction = p5.createVector(1,0)
    }
  }, 
  "down": {
    color: [0,0,255],
    isPermanent: false,
    action: (p5:p5Types, board:Board, ball:Ball, tile:Tile) => {
      ball.direction = p5.createVector(0,1)
    }
  }, 
  "left": {
    color: [0,255,255],
    isPermanent: false,
    action: (p5:p5Types, board:Board, ball:Ball, tile:Tile) => {
      ball.direction = p5.createVector(-1,0)
    }
  }, 
  "goal": {
    color: [0, 255, 255],
    isPermanent: true,
    action: (p5:p5Types, board:Board, ball:Ball, tile:Tile) => {
      tile?.owner?.incrementScore()
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
