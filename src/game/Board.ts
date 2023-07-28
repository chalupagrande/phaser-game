import { Position } from "../utils";
import { Queue } from "../utils/Queue";
import Tile from "./Tile";
import {P5Types} from "p5";

export default class Board {
  xSize: number;
  ySize: number;
  board: Queue<Tile>[][];

  constructor(xSize:number, ySize:number) {
    this.xSize = xSize;
    this.ySize = ySize;
    this.board = [];
    this.initBoard();  
  }

  initBoard = () => {
    for (let i = 0; i < this.xSize; i++) {
      this.board.push([]);
      for (let j = 0; j < this.ySize; j++) {
        this.board[i].push(new Queue<Tile>());
      }
    } 
  }

  addTile = (tile:Tile, position:Position) => {
    this.board[position.x][position.y].enqueue(tile);; 
  }

  get(position:Position):Queue<Tile> {
    return this.board[position.x][position.y];
  }


  render(p5:P5Types){
    drawBackground(p5, 50, this.xSize, this.ySize);
  }
}

function drawBackground(p5: P5Types, tileSize: number, xSize: number, ySize: number){  
  p5.background(255);
  p5.stroke(0);
  p5.strokeWeight(1);
  for (let i = 0; i < xSize; i++) {
    for(let j = 0; j < ySize; j++) {
      p5.fill(255);
      p5.rect(i * tileSize, j * tileSize, tileSize, tileSize);
    }
  }
}


