import p5Types from 'p5'
import { GameSettings, initialGameSettings, initialGameContext } from '../components/GameContext'
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
  ball: Ball;
  board: Board; 
  updateGameState: typeof initialGameContext.updateGameState;

  constructor() {
    this.playState = GamePlayStates.PLAYING
    this.settings = initialGameSettings
    this.players = []
    // @ts-ignore // these will always be set before used because of init
    this.ball = undefined
    // @ts-ignore // these will always be set before used because of init
    this.board = undefined
    this.updateGameState = (newGameState: any) => {}
  }

  init(settings:GameSettings, updateGameState: typeof initialGameContext.updateGameState) {
    this.settings = settings
    this.updateGameState = updateGameState
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

  setPlayState(playState: GamePlayState) {
    this.playState = playState
  }

  // use this to update the HUD
  updateHUD(){
    this.updateGameState(this.getGameState())
  }


  getGameState() {
    return {
      playState: this.playState,
      players: this.players,
      ball: this.ball,
      board: this.board,
    }
  }

  getGameSettings(){
    return this.settings
  }
}

export default new Game()