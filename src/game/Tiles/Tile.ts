import { pickRandom } from "../../utils";
import p5Types from 'p5'

const TileTypes = {
  "tile": {
    color: [255,255,0]
  }, 
  "ball": {
    color: [255,0,255]
  }, 
  "player": {
    color: [0,255,0]
  }, 
  "wall": {
    color: [0,255,255]
  }, 
  "goal": {
    color: [0, 0, 255]
  }, 
  "empty": {
    color: [0,0,0]}
} as const;

export type TileType = keyof typeof TileTypes;

export class Tile {
  position: p5Types.Vector;
  velocity: p5Types.Vector;
  isPermanent: boolean = true;
  type: TileType;

  constructor(position:p5Types.Vector, velocity:p5Types.Vector, isPermanent:boolean = true, type?: TileType){
    this.position = position;
    this.velocity = velocity;
    this.isPermanent = isPermanent;
    this.type = type || pickRandom(Object.keys(TileTypes) as TileType[]);
  }

  render(p5:p5Types, tileSize:number, position?:p5Types.Vector){
    const color = TileTypes[this.type].color
    p5.fill(color[0], color[1], color[2]);
    if(position) {
      p5.rect(position.x, position.y, tileSize, tileSize);
    } else {
      p5.rect(this.position.x * tileSize, this.position.y * tileSize, tileSize, tileSize);
    }
  }
}