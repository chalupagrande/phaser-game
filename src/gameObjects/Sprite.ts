import p5Types from 'p5';
import GameObject from './GameObject';

export type FrameData = {
  x: number,
  y: number,
  width: number,
  height: number,
}

class Sprite extends GameObject {
  spriteSheet: p5Types.Image;
  frameData: FrameData[];
  speed: number;
  currentFrame: number;

  constructor(p5: p5Types, spriteSheet: p5Types.Image, frameData: FrameData[], speed: number) {
    super(p5)
    this.spriteSheet = spriteSheet;
    this.frameData = frameData;
    this.speed = speed;
    this.currentFrame = 0;
  }

  render(position: p5Types.Vector, scale: number = 1) {
    if(!this.frameData) return 
    const p5 = this.p5;
    p5.push()
    p5.translate(position.x, position.y)
    p5.scale(scale)
    if(this.currentFrame === 4) debugger
    const {x, y, width, height} = this.frameData[this.currentFrame];
    p5.image(this.spriteSheet, 0, 0, width, height, x, y, width, height);
    p5.pop()

    if(p5.frameCount % this.speed === 0) {
      this.currentFrame += 1
    }
    if(this.currentFrame >= this.frameData.length) {
      this.currentFrame = 0
    }
  }
}

export default Sprite