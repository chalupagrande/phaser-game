import p5Types from 'p5'
import { GameSettings, initialGameSettings } from '../components/GameContext'
import Player from './Player'
import Ball from './Ball'
import Board from './Board'

const GamePlayStates = {
  "PLAYING": "playing",
  "PAUSED": "paused" ,
  "GAMEOVER": "gameover",
  "PREPLAY": "preplay",
} as const
type GamePlayState = typeof GamePlayStates[keyof typeof GamePlayStates]

class Game {
  playState: GamePlayState;
  players: Player[];
  settings: GameSettings = initialGameSettings;
  ball?: Ball;
  board?: Board; 

  constructor(p5: p5Types) {
    this.playState = GamePlayStates.PLAYING
    this.settings = initialGameSettings
    this.players = []
    this.ball = undefined
    this.board = undefined
  }

  setPlayers(players: Player[]) {
    this.players = players
  }

  setBall(ball: Ball) {
    this.ball = ball
  }

  setBoard(board: Board) {
    this.board = board
  }

  setSettings(settings: GameSettings) {
    this.settings = settings
  }

  setPlayState(playState: GamePlayState) {
    this.playState = playState
  }

  getGameState() {
    return {
      playState: this.playState,
      players: this.players,
      ball: this.ball,
      board: this.ball,
    }
  }
}

export default Game