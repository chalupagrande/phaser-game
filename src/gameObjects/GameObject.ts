import p5Types from 'p5'
import { GameState } from '../components/GameContext'

class GameObject {
  p5: p5Types;
  constructor(p5: p5Types) {
    this.p5 = p5
  }

  draw(gameState: GameState) {
    const p5 = this.p5
    p5.push()
    p5.fill(255, 0, 0)
    p5.rect(50, 50, 50, 50)
    p5.pop()
  }
}

export default GameObject