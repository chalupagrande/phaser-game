import p5Types from 'p5'
import Board from './Board';

export default class Ball {
  position: p5Types.Vector;
  direction: p5Types.Vector;
  speed: number;
  ballGridPosition: p5Types.Vector;
  nextBallGridPosition: p5Types.Vector;

  constructor(initialPosition: p5Types.Vector, initialVelocity: p5Types.Vector, speed:number = 1){
    this.position = initialPosition;
    this.direction = initialVelocity;
    this.speed = speed;
    this.ballGridPosition = initialPosition;
    this.nextBallGridPosition = initialPosition;
  }

  render(p5:p5Types, tileSize:number, board:Board){
    // render
    p5.push()
    p5.translate(tileSize/2, tileSize/2)
    p5.noStroke()
    p5.fill(0);
    p5.circle(this.position.x, this.position.y, tileSize);
    p5.pop()

    // update
    const velocity = this.direction.copy().mult(this.speed);
    const nextPosition = this.position.copy().add(velocity);
    const width = (board.xSize -1 ) * tileSize;
    const height = (board.ySize -1 )* tileSize;

    // reflect & update
    if(nextPosition.x > width || nextPosition.x < 0 || nextPosition.y > height || nextPosition.y < 0) {
      this.direction.x *= -1;
      this.direction.y *= -1;
      this.position.add(this.direction);
    } else {
      this.position = nextPosition
    }

    // grid position
    const nextBallGridPosition = p5.createVector(
      Math.floor(this.position.x / tileSize), 
      Math.floor(this.position.y / tileSize)
    );  
    if(this.direction.x < 0) {
      nextBallGridPosition.x += 1
    } 
    if(this.direction.y < 0) {
      nextBallGridPosition.y += 1
    }

    // check for tile on board
    if(!nextBallGridPosition.equals(this.ballGridPosition)) {
      const tileQueue = board.get(nextBallGridPosition);
      const tile = tileQueue.peek();
      if(tile && !tile.isPermanent) {
        tileQueue.dequeue();
      }
    }

    this.ballGridPosition = nextBallGridPosition
    this.nextBallGridPosition = this.ballGridPosition.copy().add(this.direction)

    // draw grid
    p5.stroke(200,200,200)
    p5.strokeWeight(3)
    p5.rect(this.ballGridPosition.x * tileSize, this.ballGridPosition.y * tileSize, tileSize, tileSize)
    p5.stroke(200,0,200)
    p5.rect(this.nextBallGridPosition.x * tileSize, this.nextBallGridPosition.y * tileSize, tileSize, tileSize)
  }
  
}