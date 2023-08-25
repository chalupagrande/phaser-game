import p5Types from 'p5'
import Board from './Board';
import { random } from '../utils';

export default class Ball {
  p5: p5Types;
  position: p5Types.Vector;
  direction: p5Types.Vector;
  speed: number;
  ballGridPosition: p5Types.Vector;
  ballDiameter: number;
  initialPosition: p5Types.Vector;
  initialSpeed: number;

  constructor(p5: p5Types, diameter: number, initialPosition: p5Types.Vector, initialDirection: p5Types.Vector, speed:number = 1){
    this.p5 = p5;
    this.position = initialPosition;
    this.direction = initialDirection;
    this.speed = speed;
    this.ballGridPosition = initialPosition;
    this.ballDiameter = diameter;
    this.initialPosition = initialPosition
    this.initialSpeed = speed
  }

  calculateNextPosition(board:Board) {
    const {width, height, tileSize} = board
    let velocity = this.direction.copy().mult(this.speed);
    // calculate next position
    let nextPosition = this.position.copy().add(velocity);
    if(nextPosition.x > width - tileSize || nextPosition.x < 0) {
      this.direction.x *= -1 
      velocity = this.direction.copy().mult(this.speed)
      nextPosition = this.position.copy().add(velocity)
    }
    if(nextPosition.y > height - tileSize || nextPosition.y < 0) {
      this.direction.y *= -1
      velocity = this.direction.copy().mult(this.speed)
      nextPosition = this.position.copy().add(velocity)
    }
    return nextPosition
  }

  calculateGridPosition(position: p5Types.Vector, board:Board) {
    const p5 = this.p5
    const {tileSize} = board
    // calculate current GRID position
    if(this.direction.x < 0 || this.direction.y < 0) {
      return p5.createVector(
        Math.floor((position.x + (tileSize- 0.1)) / tileSize), 
        Math.floor((position.y + (tileSize- 0.1)) / tileSize)
      )
    } else {
      return p5.createVector(
        Math.floor(position.x / tileSize), 
        Math.floor(position.y / tileSize)
      );  
    }
  }

  reset(board:Board) {
    this.position = this.initialPosition.copy()
    this.ballGridPosition = this.calculateGridPosition(this.position, board)
    const dir = random(2) === 0 ? -1 : 1
    this.direction = this.p5.createVector(0,dir)
    this.speed = this.initialSpeed
  }

  render(board:Board){
    const p5 = this.p5;
    const {tileSize} = board
    // render
    p5.push()
    p5.translate(tileSize/2, tileSize/2)
    p5.noStroke()
    p5.fill(0);
    p5.circle(this.position.x, this.position.y, this.ballDiameter);
    p5.pop()

    let nextPosition = this.calculateNextPosition(board)
    let gridPosition = this.calculateGridPosition(nextPosition, board)
    
    // calculate nextGridPosition
    let possibleNextPosition;
    let isNewGame = false
    if(!gridPosition.equals(this.ballGridPosition)) {
      const tileQueue = board.get(gridPosition);
      const tile = tileQueue.peek();
      if(tile) {
        if(!tile.isPermanent) {
          tileQueue.dequeue();
          tile.owner?.givePlayerNewTile()
        }
        isNewGame = !!tile.action(board, this)
      }
      possibleNextPosition = gridPosition.copy().mult(tileSize)
    }

    
    if(!isNewGame) {
      let newNextPosition = possibleNextPosition || nextPosition
      this.position = newNextPosition
      this.ballGridPosition = gridPosition
    }
    
  
    // draw ball grid position
    // p5.stroke(0)
    // p5.strokeWeight(3)
    // p5.rect(this.ballGridPosition.x * tileSize, this.ballGridPosition.y * tileSize, tileSize, tileSize)
  }
  
}