import React, {useContext} from 'react';
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import Board from './Board';
import Player from './Player';
import Ball from './Ball';
import { GameContext } from '../components/GameContext';


const OPTIONS = {
  tileSize: 50,
  boardXSize: 5,
  boardYSize: 5, 
}

export type GameOptions = typeof OPTIONS

export const initialGameState = {
  players: [],
  board: null,
  ball: null,
  tileSize: 50
}

export type GameState = {
  players?: Player[],
  board?: Board | null,
  ball?: Ball | null,
}

// initialize internal game state
let gameState:GameState = initialGameState

const Game = () => {
  let paused = false;
  const {updateContext} = useContext(GameContext)

  const updateGameState = (update: (gameState:GameState, options?: GameOptions) => GameState) => {
    const newGameState = update(gameState, OPTIONS)
    gameState = {...gameState, ...newGameState}
    updateContext(gameState)
  }

  const setup = (p5:p5Types, canvasParentRef:Element) => {
    // create canvas
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    // initialize players
    const player1 = new Player(
      p5,
      updateGameState,
      0,
      p5.createVector(0,0),
      p5.color(255,0,0), 
      {
        up: "ArrowUp",
        down: "ArrowDown",
        left: "ArrowLeft",
        right: "ArrowRight",
        placeTile1: "8",
        placeTile2: "9",
        placeTile3: "0",
      })
    const player2 = new Player(
      p5,
      updateGameState,
      1,
      p5.createVector(2,2),
      p5.color(0,255,0),
      {
        up: "w",
        down: "s",
        left: "a",
        right: "d",
        placeTile1: "1",
        placeTile2: "2",
        placeTile3: "3",
      })
    const players = [player1, player2]
    const board = new Board(p5, OPTIONS.boardXSize, OPTIONS.boardYSize, OPTIONS.tileSize)
    const ball = new Ball(p5, OPTIONS.tileSize, p5.createVector(0,0), p5.createVector(0,1), 2)
    gameState = {...gameState, players, board, ball}
    console.log("GAME STATE SETIP", gameState)
  };

  const draw = (p5:p5Types) => {
    if(paused) return;
    const {players, board, ball} = gameState
    if(board && ball && Array.isArray(players) && players.length > 0) {
      p5.background(0);
      board.render()
      players.forEach((player) => player.update(gameState, OPTIONS))
      ball.render(board)
    }
  };

  const windowResized = (p5:p5Types) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
  }

  const keyPressed = (p5:p5Types, event:UIEvent | undefined) => {
    if(event?.preventDefault) {
      event.preventDefault()
    }
    const key = p5.key;
    if(key === " ") {
      paused = !paused;
    } 

    const {players, board} = gameState
    if(Array.isArray(players) && players.length > 0) {
      players.forEach(player => player.handleKeyPress(key, board))
    }
    return false
  }

  return (<Sketch setup={setup} draw={draw} windowResized={windowResized} keyPressed={keyPressed}/>); 
}

export default React.memo(Game, (prevProps, nextProps) => false)