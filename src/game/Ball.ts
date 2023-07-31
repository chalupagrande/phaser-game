import p5Types from 'p5'
import Board from './Board';

export default class Ball {
  position: p5Types.Vector;
  velocity: p5Types.Vector;
  ballGridPosition: p5Types.Vector;
  nextBallGridPosition: p5Types.Vector;

  constructor(initialPosition: p5Types.Vector, initialVelocity: p5Types.Vector){
    this.position = initialPosition;
    this.velocity = initialVelocity;
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
    const nextPosition = this.position.copy().add(this.velocity);
    const width = (board.xSize -1 ) * tileSize;
    const height = (board.ySize -1 )* tileSize;

    // reflect 
    if(nextPosition.x > width || nextPosition.x < 0 || nextPosition.y > height || nextPosition.y < 0) {
      this.velocity.x *= -1;
      this.velocity.y *= -1;
      this.position.add(this.velocity);
    } else {
      this.position = nextPosition
    }

    this.ballGridPosition = p5.createVector(
      Math.floor(this.position.x / tileSize), 
      Math.floor(this.position.y / tileSize)
    );  
    if(this.velocity.x < 0) {
      this.ballGridPosition.x += 1
    } 
    if(this.velocity.y < 0) {
      this.ballGridPosition.y += 1
    } 

    p5.stroke(200,200,200)
    p5.strokeWeight(3)
    p5.rect(this.ballGridPosition.x * tileSize, this.ballGridPosition.y * tileSize, tileSize, tileSize)

    
  }
  
}