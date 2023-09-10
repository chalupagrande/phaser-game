import p5Types from 'p5'
import { random } from '../utils';
import Game from './Game';
import GameObject from './GameObject';

export default class Ball extends GameObject{
  position: p5Types.Vector;
  direction: p5Types.Vector;
  speed: number;
  ballGridPosition: p5Types.Vector;
  ballDiameter: number;
  initialPosition: p5Types.Vector;
  initialSpeed: number;
  color: p5Types.Color;
  prevPosition: p5Types.Vector;

  constructor(p5: p5Types, diameter: number, initialPosition: p5Types.Vector, initialDirection: p5Types.Vector, speed:number = 1){
    super(p5)
    this.position = initialPosition;
    this.direction = initialDirection;
    this.speed = speed;
    this.ballGridPosition = initialPosition;
    this.ballDiameter = diameter;
    this.initialPosition = initialPosition
    this.initialSpeed = speed
    this.color = p5.color(229,107,3)
    this.prevPosition = initialPosition.copy()
  }

  calculateNextPosition() {
    const {board} = Game.getGameState()
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

  calculateGridPosition(position: p5Types.Vector) {
    const p5 = this.p5
    const {tileSize} = Game.getGameSettings()
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

  reset() {
    this.position = this.initialPosition.copy()
    this.ballGridPosition = this.calculateGridPosition(this.position)
    const dir = random(2) === 0 ? -1 : 1
    this.direction = this.p5.createVector(0,dir)
    this.speed = this.initialSpeed
  }

  draw(){
    const {board} = Game.getGameState()
    const p5 = this.p5;
    const {tileSize} = Game.getGameSettings()
    const color = this.color
    // render
    p5.translate(tileSize/2, tileSize/2)
    p5.noStroke()
    p5.fill(this.color);
    p5.push()
    // @ts-ignore
    p5.drawingContext.shadowOffsetX = 0;
    // @ts-ignore
    p5.drawingContext.shadowOffsetY = 0;
    // @ts-ignore
    p5.drawingContext.shadowBlur = 20;
    // @ts-ignore
    p5.drawingContext.shadowColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    p5.circle(this.position.x, this.position.y, this.ballDiameter);
    p5.pop()

    let nextPosition = this.calculateNextPosition()
    let gridPosition = this.calculateGridPosition(nextPosition)
    
    // calculate nextGridPosition
    let possibleNextPosition;
    let actionChangedPositionOfTheBall = false
    if(!gridPosition.equals(this.ballGridPosition)) {
      const tileQueue = board.get(gridPosition);
      const tile = tileQueue.peek();
      if(tile) {
        if(!tile.isPermanent) {
          tileQueue.dequeue();
          tile.owner?.givePlayerNewTile()
        }
        actionChangedPositionOfTheBall = !!tile.action()
      }
      possibleNextPosition = gridPosition.copy().mult(tileSize)
    }

    // if it has not changed position, move to next position
    if(!actionChangedPositionOfTheBall) {
      let newNextPosition = possibleNextPosition || nextPosition
      this.position = newNextPosition
      this.ballGridPosition = gridPosition
    }
    
  
    // draw ball grid position
    // p5.stroke(0)
    // p5.strokeWeight(3)
    // p5.rect(this.ballGridPosition.x * tileSize, this.ballGridPosition.y * tileSize, tileSize, tileSize)

    // draw ball next position

  }
  
}