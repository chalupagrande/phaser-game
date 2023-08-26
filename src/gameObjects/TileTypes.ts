import p5Types from "p5";
import Tile from "./Tile";
import Game from './Game'

// TODO: figure out how to make this the type of TileTypes object
// to ensure type safety
export type TileTypeType = {
  color: number[],
  isPermanent: boolean,
  action: (p5:p5Types, tile:Tile, game:typeof Game) => boolean
}


export const TileTypes = {
  "up": {
    color: [255,0,0],
    isPermanent: false,
    action: (p5:p5Types, tile:Tile, game:typeof Game):boolean => {
      const {ball} = game.getGameState()
      ball.direction = p5.createVector(0,-1)
      return false
    }
  }, 
  "right": {
    color: [0,255,0],
    isPermanent: false,
    action: (p5:p5Types, tile:Tile, game:typeof Game):boolean => {
      const {ball} = game.getGameState()
      ball.direction = p5.createVector(1,0)
      return false
    }
  }, 
  "down": {
    color: [0,0,255],
    isPermanent: false,
    action: (p5:p5Types, tile:Tile, game:typeof Game):boolean => {
      const {ball} = game.getGameState()
      ball.direction = p5.createVector(0,1)
      return false
    }
  }, 
  "left": {
    color: [0,255,255],
    isPermanent: false,
    action: (p5:p5Types, tile:Tile, game:typeof Game):boolean => {
      const {ball} = game.getGameState()
      ball.direction = p5.createVector(-1,0)
      return false
    }
  }, 
  "fast": {
    color: [0,255,255],
    isPermanent: false,
    action: (p5:p5Types, tile:Tile, game:typeof Game):boolean => {
      const {ball} = game.getGameState()
      ball.speed = ball.speed * 1.2
      return false
    }
  }, 
  // "slow": {
  //   color: [0,255,255],
  //   isPermanent: false,
  //   action: (p5:p5Types, tile:Tile, game:typeof Game) => {
  //     ball.speed = ball.speed * 0.5
  //   }
  // }, 
  "goal": {
    color: [0, 255, 255],
    isPermanent: true,
    action: (p5:p5Types, tile:Tile, game:typeof Game):boolean => {
      const {ball, board, players} = game.getGameState()
      tile.owner.incrementScore()
      players.forEach(player => player.reset())
      ball.reset()
      board.reset()
      return true
    }
  }, 
  // "wall": {
  //   color: [0,0,0],
  //   action: (p5:p5Types, board:Board, ball:Ball, tile:Tile) => {
  //     console.log(tile)
  //   }
  // }
} as const;


export const TileTypeKeys = Object.keys(TileTypes) as TileType[]
export const PlayableTileTypeKeys = TileTypeKeys.filter((key) => !TileTypes[key].isPermanent)

export type TileType = keyof typeof TileTypes;
