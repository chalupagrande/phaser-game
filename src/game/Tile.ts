import { Position, Velocity } from "../utils";

export default class Tile {
  position: [number, number];
  direction: number;
  isPermanent: boolean = true;

  constructor(position:[number, number], direction:number, isPermanent:boolean = true){
    this.position = position;
    this.direction = direction;
    this.isPermanent = isPermanent;
  }
}