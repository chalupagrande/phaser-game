import { Position } from "../utils";
import { Queue } from "../utils/Queue";
import Tile from "./Tile";
import p5Types from "p5";

export default class Board {
  xSize: number;
  ySize: number;
  tileSize: number;
  board: Queue<Tile>[][];

  constructor(xSize:number, ySize:number, tileSize:number) {
    this.xSize = xSize;
    this.ySize = ySize;
    this.tileSize = tileSize;
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
    tile.position = position;
    this.get(position).enqueue(tile);
    console.log(this.get(position))
  }

  get(position:Position):Queue<Tile> {
    return this.board[position.x][position.y];
  }


  render(p5:p5Types){
    this.drawBackground(p5);
    this.drawTiles(p5);
  }

  drawBackground(p5: p5Types){  
    p5.background(255);
    p5.stroke(0);
    p5.strokeWeight(1);
    for (let i = 0; i < this.xSize; i++) {
      for(let j = 0; j < this.ySize; j++) {
        p5.fill(255);
        p5.rect(i * this.tileSize, j * this.tileSize, this.tileSize, this.tileSize);
      }
    }
  }


  drawTiles(p5:p5Types) {
    p5.stroke(0);
    p5.strokeWeight(1);
    for (let i = 0; i < this.xSize; i++) {
      for(let j = 0; j < this.ySize; j++) {
        const tileQueue = this.get(new Position(i, j))
        const topTile = tileQueue.peek();
        if(topTile) {
          topTile.render(p5, this.tileSize)
        }
      }
    }
  }

}