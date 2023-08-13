import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import Board from './Board';
import Match from './Match';
import Player from './Player';
import Ball from './Ball';


let match:Match;
let board:Board;
let players:Player[];
let tileSize:number = 50;
let ball: Ball;


const Game = () => {
  let paused = false;

  const setup = (p5:p5Types, canvasParentRef:Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    const player1 = new Player(
      p5,
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
    players = [player1, player2]
    board = new Board(5, 5, tileSize)
    match = new Match(10, [player1, player2], board)
    ball = new Ball(tileSize, p5.createVector(0,0), p5.createVector(0,1), 0.3)
  };

  const draw = (p5:p5Types) => {
    if(paused) return;
    p5.background(0);
    board.render(p5)
    players.forEach((player, i) => player.render(p5, tileSize, i))
    ball.render(p5, board)
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
    players.forEach(player => player.handleKeyPress(p5, key, board))
    return false
  }

  return (<Sketch setup={setup} draw={draw} windowResized={windowResized} keyPressed={keyPressed}/>); 
}

export default Game