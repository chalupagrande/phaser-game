import { Position, Velocity } from "../utils";

export default class Tile {
  position: Position;
  velocity: Velocity;
  isPermanent: boolean = true;

  constructor(position:Position, velocity: Velocity, isPermanent:boolean = true){
    this.position = position;
    this.velocity = velocity;
    this.isPermanent = isPermanent;
  }
}