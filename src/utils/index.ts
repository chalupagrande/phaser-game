export const Direction = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT"
} as const

export class Velocity { 
  speed: number;
  direction: typeof Direction;

  constructor(speed:number, direction: typeof Direction) {
    this.speed = speed
    this.direction = direction
  }
}

export class Position {
  x: number;
  y: number;

  constructor(x:number, y:number) {
    this.x = x;
    this.y = y;
  }
}