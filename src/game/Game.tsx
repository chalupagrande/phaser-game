import React from 'react'
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import Board from './Board';
import Match from './Match';
import { Position } from '../utils';
import Player from './Player';


let x = 50;
const y = 50;
let direction = 1;
let match:Match;
let board:Board;
let players:Player[];
let tileSize:number = 50;


const Game = () => {
  const setup = (p5:p5Types, canvasParentRef:Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    const player1 = new Player(new Position(0,0), p5.color(255,0,0), {up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight"})
    const player2 = new Player(new Position(2,0), p5.color(0,255,0), {up: "w", down: "s", left: "a", right: "d"})
    players = [player1, player2]
    board = new Board(10, 10)
    match = new Match(10, [player1, player2], board)

    console.log(match)
  };

  const draw = (p5:p5Types) => {
    p5.background(0);
    p5.ellipse(x, y, 70, 70);
    x+=direction;
    board.render(p5)
    players.forEach(player => player.render(p5, tileSize))
  };

  const windowResized = (p5:p5Types) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
  }

  const keyPressed = (p5:p5Types) => {
    const key = p5.key;
    players.forEach(player => player.handleKeyPress(key))
  }

  return (<Sketch setup={setup} draw={draw} windowResized={windowResized} keyPressed={keyPressed}/>); 
}

export default Game