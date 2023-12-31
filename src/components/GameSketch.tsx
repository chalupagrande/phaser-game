import React, {useContext} from 'react';
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import Board from '../gameObjects/Board';
import Player from '../gameObjects/Player';
import Ball from '../gameObjects/Ball';
import Tile from '../gameObjects/Tile';
import { 
  GameContext, 
 } from './GameContext';
import { random } from '../utils';
import Game from '../gameObjects/Game'


const GameSketch = () => {  
  let paused = false;
  const {gameSettings: settings, updateGameState} = useContext(GameContext)
  
  const setup = (p5:p5Types, canvasParentRef:Element) => {
    // create canvas
    Game.init(settings, updateGameState)
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    const middleX = Math.floor(settings.boardTileWidth/2)
    const middleY = Math.floor(settings.boardTileHeight/2)
    const randomBallDirection = random(2) === 0 ? p5.createVector(0,-1) : p5.createVector(0,1)
    // initialize players
    const player1 = new Player(
      p5,
      0,
      p5.createVector(0,middleY),
      [255,0,0], 
      {
        up: "i",
        down: "k",
        left: "j",
        right: "l",
        placeTile1: "q",
        placeTile2: "w",
        placeTile3: "e",
        placeTile4: "r",
        placeTile5: "t",
      })
    const player2 = new Player(
      p5,
      1,
      p5.createVector(settings.boardTileWidth - 1,middleY), // start position
      [0,255,0], // color
      {
        up: "ArrowUp",
        down: "ArrowDown",
        left: "ArrowLeft",
        right: "ArrowRight",
        placeTile1: "1",
        placeTile2: "2",
        placeTile3: "3",
        placeTile4: "4",
        placeTile5: "5",
      })
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
    Game.setPlayers(players)
    Game.setBall(ball)
    Game.setBoard(board)
    Game.updateHUD()
  };

  const draw = (p5:p5Types) => {
    if(paused) return;
    const gameState = Game.getGameState()
    const {board, ball, players} = gameState
    if(board && ball && Array.isArray(players) && players.length > 0) {
      p5.background(25,12,38);
      board.draw()
      players.forEach((player) => player.draw())
      ball.draw()
    }
    // console.log(Math.floor(p5.frameRate()))
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

    const {players, board} = Game.getGameState()
    if(Array.isArray(players) && players.length > 0 && board) {
      players.forEach(player => player.handleKeyPress(key))
    }
    return false
  }

  return (
    <Sketch 
      setup={setup}
      draw={draw}
      windowResized={windowResized}
      keyPressed={keyPressed}
      />
  ); 
}

export default React.memo(GameSketch, () => false)