import React, {useContext} from 'react';
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import Board from '../gameObjects/Board';
import Player from '../gameObjects/Player';
import Ball from '../gameObjects/Ball';
import Tile from '../gameObjects/Tile';
import { 
  GameContext, 
  GameSettings, 
  initialGameState, 
  GameState
 } from './GameContext';
import { random } from '../utils';


// initialize internal game state
let gameState:GameState = initialGameState

const GameSketch = () => {
  let paused = false;
  const {gameSettings: settings, updateGameState} = useContext(GameContext)
  // wrapper function that will update BOTH GameContext and internal game state
  // use this to keep internal game staten in sync with GameContext
  const updateGame = (update: (gameState:GameState, settings?: GameSettings) => GameState) => {
    const newGameState = update(gameState, settings)
    gameState = {...gameState, ...newGameState}
    updateGameState(gameState)
  }

  const setup = (p5:p5Types, canvasParentRef:Element) => {
    // create canvas
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    const middleX = Math.floor(settings.boardTileWidth/2)
    const middleY = Math.floor(settings.boardTileHeight/2)
    const randomBallDirection = random(2) === 0 ? p5.createVector(0,-1) : p5.createVector(0,1)
    // initialize players
    const player1 = new Player(
      p5,
      updateGame,
      0,
      p5.createVector(0,middleY),
      [255,0,0], 
      {
        up: "w",
        down: "s",
        left: "a",
        right: "d",
        placeTile1: "1",
        placeTile2: "2",
        placeTile3: "3",
      }
      )
    const player2 = new Player(
      p5,
      updateGame,
      1,
      p5.createVector(settings.boardTileWidth - 1,middleY), // start position
      [0,255,0], // color
      {
        up: "ArrowUp",
        down: "ArrowDown",
        left: "ArrowLeft",
        right: "ArrowRight",
        placeTile1: "8",
        placeTile2: "9",
        placeTile3: "0",
      }
      )
    const players = [player1, player2]
    const goalTiles = players.map(player => {
      const goalTileXPos = player.playerId === 1 ? 0 : settings.boardTileWidth - 1
      return new Tile(p5, p5.createVector(goalTileXPos, middleY), player, "goal")
    })

    const board = new Board(
      p5,
      settings.boardTileWidth,
      settings.boardTileHeight,
      settings.tileSize,
      goalTiles)
    
    const ball = new Ball(
      p5, 
      settings.ballSize, 
      p5.createVector(middleX * settings.tileSize, middleY*settings.tileSize), 
      randomBallDirection, 
      settings.initialBallSpeed * 1)
    // set the initial internal game state
    gameState = {...gameState, players, board, ball}
  };

  const draw = (p5:p5Types) => {
    if(paused) return;
    const {players, board, ball} = gameState
    if(board && ball && Array.isArray(players) && players.length > 0) {
      p5.background(0);
      board.render()
      players.forEach((player) => player.update(gameState, settings))
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

export default React.memo(GameSketch, () => false)