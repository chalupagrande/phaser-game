import { Position } from "../utils";
import { Queue } from "../utils/Queue";
import Tile from "./Tile";

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
}


