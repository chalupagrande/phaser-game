import p5Types from 'p5'

class GameObject {
  p5: p5Types;
  constructor(p5: p5Types) {
    this.p5 = p5
  }

  draw() {
    const p5 = this.p5
    p5.push()
    p5.fill(255, 0, 0)
    p5.rect(50, 50, 50, 50)
    p5.pop()
  }
}

export default GameObject