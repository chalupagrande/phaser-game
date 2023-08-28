import p5Types from "p5";
import Tile from "./Tile";
import Game from './Game'

// TODO: figure out how to make this the type of TileTypes object
// to ensure type safety
export type TileTypeType = {
  color: number[],
  isPermanent: boolean,
  action: (p5:p5Types, tile:Tile) => boolean
  draw: (p5:p5Types, tile:Tile) => void
}


const TRI_SIZE = 15

export const TileTypes = {
  "up": {
    color: [255,0,0],
    isPermanent: false,
    action: (p5:p5Types, tile:Tile):boolean => {
      const {ball} = Game.getGameState()
      ball.direction = p5.createVector(0,-1)
      return false
    },
    draw: (p5:p5Types, tile:Tile) => {
      const {tileSize, showTileAction} = Game.getGameSettings()
      const {x,y} = tile.position
      p5.push()
      p5.translate(x * tileSize,y * tileSize)
      p5.fill(...tile.owner.color)
      p5.rect(0,0, tileSize, tileSize)
      if(showTileAction) {
        p5.triangle(0 + TRI_SIZE, tileSize - TRI_SIZE, tileSize/2, TRI_SIZE, tileSize - TRI_SIZE, tileSize - TRI_SIZE);
      }
      p5.pop()
    }
  }, 
  "right": {
    color: [0,255,0],
    isPermanent: false,
    action: (p5:p5Types, tile:Tile):boolean => {
      const {ball} = Game.getGameState()
      ball.direction = p5.createVector(1,0)
      return false
    },
    draw: (p5:p5Types, tile:Tile) => {
      const {tileSize, showTileAction} = Game.getGameSettings()
      const {x,y} = tile.position
      p5.push()
      p5.translate(x * tileSize,y * tileSize)
      p5.fill(...tile.owner.color)
      p5.rect(0,0, tileSize, tileSize)
      if(showTileAction) {
        p5.triangle(TRI_SIZE, TRI_SIZE, TRI_SIZE, tileSize - TRI_SIZE, tileSize - TRI_SIZE, tileSize/2);
      }
      p5.pop()
    }

  }, 
  "down": {
    color: [0,0,255],
    isPermanent: false,
    action: (p5:p5Types, tile:Tile):boolean => {
      const {ball} = Game.getGameState()
      ball.direction = p5.createVector(0,1)
      return false
    },
    draw: (p5:p5Types, tile:Tile) => {
      const {tileSize, showTileAction} = Game.getGameSettings()
      const {x,y} = tile.position
      p5.push()
      p5.translate(x * tileSize,y * tileSize)
      p5.fill(...tile.owner.color)
      p5.rect(0,0, tileSize, tileSize)
      if(showTileAction) { 
        p5.triangle(TRI_SIZE, TRI_SIZE, tileSize/2, tileSize - TRI_SIZE, tileSize - TRI_SIZE, TRI_SIZE);
      }
      p5.pop()
    }
  }, 
  "left": {
    color: [0,255,255],
    isPermanent: false,
    action: (p5:p5Types, tile:Tile):boolean => {
      const {ball} = Game.getGameState()
      ball.direction = p5.createVector(-1,0)
      return false
    },
    draw: (p5:p5Types, tile:Tile) => {
      const {tileSize, showTileAction } = Game.getGameSettings()
      const {x,y} = tile.position
      p5.push()
      p5.translate(x * tileSize,y * tileSize)
      p5.fill(...tile.owner.color)
      p5.rect(0,0, tileSize, tileSize)
      if(showTileAction) {
        p5.triangle(tileSize - TRI_SIZE, TRI_SIZE, tileSize - TRI_SIZE, tileSize - TRI_SIZE, TRI_SIZE, tileSize/2);
      }
      p5.pop()
    }
  }, 
  "fast": {
    color: [0,255,255],
    isPermanent: false,
    action: (p5:p5Types, tile:Tile):boolean => {
      const {ball} = Game.getGameState()
      ball.speed = ball.speed * 1.2
      return false
    },
    draw: (p5:p5Types, tile:Tile) => {
      const {tileSize} = Game.getGameSettings()
      const {x,y} = tile.position
      p5.fill(...tile.owner.color)
      p5.rect(x * tileSize, y * tileSize, tileSize, tileSize)

    }
  }, 
  // "slow": {
  //   color: [0,255,255],
  //   isPermanent: false,
  //   action: (p5:p5Types, tile:Tile) => {
  //     ball.speed = ball.speed * 0.5
  //   }
  // }, 
  "goal": {
    color: [0, 255, 255],
    isPermanent: true,
    action: (p5:p5Types, tile:Tile):boolean => {
      const {ball, board, players} = Game.getGameState()
      tile.owner.incrementScore()
      players.forEach(player => player.reset())
      ball.reset()
      board.reset()
      return true
    },
    draw: (p5:p5Types, tile:Tile) => {
      const {tileSize} = Game.getGameSettings()
      const {x,y} = tile.position
      p5.fill(0, 255, 255)
      p5.rect(x * tileSize, y * tileSize, tileSize, tileSize)
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
