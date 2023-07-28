export default class Tile {
  position: [number, number];
  direction: number;

  constructor(position:[number, number], direction:number){
    this.position = position;
    this.direction = direction;
  }
}