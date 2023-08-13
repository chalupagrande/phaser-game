import p5Types from 'p5'
import Board from './Board';

export default class Ball {
  position: p5Types.Vector;
  direction: p5Types.Vector;
  speed: number;
  ballGridPosition: p5Types.Vector;
  nextBallGridPosition: p5Types.Vector;
  ballDiameter: number;

  constructor(diameter: number, initialPosition: p5Types.Vector, initialVelocity: p5Types.Vector, speed:number = 1){
    this.position = initialPosition;
    this.direction = initialVelocity;
    this.speed = speed;
    this.ballGridPosition = initialPosition;
    this.nextBallGridPosition = initialPosition;
    this.ballDiameter = diameter;
  }

  calculateNextPosition(board:Board) {
    const {width, height} = board
    let velocity = this.direction.copy().mult(this.speed);
    // calculate next position
    let nextPosition = this.position.copy().add(velocity);
    if(nextPosition.x > width - this.ballDiameter || nextPosition.x < 0) {
      this.direction.x *= -1 
      velocity = this.direction.copy().mult(this.speed)
      nextPosition = this.position.copy().add(velocity)
    }
    if(nextPosition.y > height - this.ballDiameter || nextPosition.y < 0) {
      this.direction.y *= -1
      velocity = this.direction.copy().mult(this.speed)
      nextPosition = this.position.copy().add(velocity)
    }
    return nextPosition
  }

  calculateGridPosition(p5:p5Types, board:Board) {
    const {tileSize} = board
    // calculate current GRID position
    if(this.direction.x < 0 || this.direction.y < 0) {
      return p5.createVector(
        Math.floor((this.position.x + this.ballDiameter- 0.01) / tileSize), 
        Math.floor((this.position.y + this.ballDiameter- 0.01) / tileSize)
      )
    } else {
      return p5.createVector(
        Math.floor(this.position.x / tileSize), 
        Math.floor(this.position.y / tileSize)
      );  
    }
  } 

  render(p5:p5Types, board:Board){
    const {tileSize} = board

    // render
    p5.push()
    p5.translate(this.ballDiameter/2, this.ballDiameter/2)
    p5.noStroke()
    p5.fill(0);
    p5.circle(this.position.x, this.position.y, this.ballDiameter);
    p5.pop()

    let nextPosition = this.calculateNextPosition(board)
    let gridPosition = this.calculateGridPosition(p5, board)

    // calculate nextGridPosition
    if(!gridPosition.equals(this.ballGridPosition)) {
      const tileQueue = board.get(gridPosition);
      const tile = tileQueue.peek();
      console.log(tile)
      if(tile && !tile.isPermanent) {
        tileQueue.dequeue();
        tile.action(p5, board, this)
      }
    }

    nextPosition = this.calculateNextPosition(board)
    gridPosition = this.calculateGridPosition(p5, board)
    this.position = nextPosition
    this.ballGridPosition = gridPosition

  
    // // draw grid
    p5.stroke(0)
    p5.strokeWeight(3)
    p5.rect(this.ballGridPosition.x * tileSize, this.ballGridPosition.y * tileSize, tileSize, tileSize)
  }
  
}