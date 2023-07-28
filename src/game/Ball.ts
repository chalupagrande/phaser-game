import {Position, Velocity} from '../utils'


export default class Ball {
  position: Position;
  velocity: Velocity;

  constructor(initialPosition: Position, initialVelocity: Velocity){
    this.position = initialPosition;
    this.velocity = initialVelocity;
  }
}