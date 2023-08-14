import React, {useContext} from 'react';
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import Board from './Board';
import Player from './Player';
import Ball from './Ball';
import { 
  GameContext, 
  GameOptions, 
  initialGameState, 
  GameState
 } from '../components/GameContext';


// initialize internal game state
let gameState:GameState = initialGameState

const Game = () => {
  let paused = false;
  const {gameOptions: options, updateGameState} = useContext(GameContext)
  console.log("GAME OPTIONS", options)
  // wrapper function that will update BOTH GameContext and internal game state
  // use this to keep internal game staten in sync with GameContext
  const updateGame = (update: (gameState:GameState, options?: GameOptions) => GameState) => {
    const newGameState = update(gameState, options)
    gameState = {...gameState, ...newGameState}
    updateGameState(gameState)
  }

  const setup = (p5:p5Types, canvasParentRef:Element) => {
    console.log("SETTING UP")
    // create canvas
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    // initialize players
    const player1 = new Player(
      p5,
      updateGame,
      0,
      p5.createVector(0,0),
      [255,0,0], 
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
      updateGame,
      1,
      p5.createVector(2,2),
      [0,255,0],
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
    const board = new Board(p5, options.boardTileWidth, options.boardTileHeight, options.tileSize)
    const ball = new Ball(p5, options.tileSize, p5.createVector(0,0), p5.createVector(0,1), options.initialBallSpeed)
    // set the initial internal game state
    gameState = {...gameState, players, board, ball}
  };

  const draw = (p5:p5Types) => {
    if(paused) return;
    const {players, board, ball} = gameState
    if(board && ball && Array.isArray(players) && players.length > 0) {
      p5.background(0);
      board.render()
      players.forEach((player) => player.update(gameState, options))
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
    if(Array.isArray(players) && players.length > 0 && board) {
      players.forEach(player => player.handleKeyPress(key, board))
    }
    return false
  }

  return (<Sketch setup={setup} draw={draw} windowResized={windowResized} keyPressed={keyPressed}/>); 
}

export default React.memo(Game, () => false)