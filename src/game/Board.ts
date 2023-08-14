import { Queue } from "../utils/Queue";
import { Tile } from "./Tiles";
import p5Types from "p5";

export default class Board {
  p5: p5Types;
  xSize: number;
  ySize: number;
  width: number;
  height: number;
  tileSize: number;
  board: Queue<Tile>[][];

  constructor(p5: p5Types, xSize:number, ySize:number, tileSize:number) {
    this.p5 = p5;
    this.xSize = xSize;
    this.ySize = ySize;
    this.width = xSize * tileSize
    this.height = ySize * tileSize
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

  addTile = (position:p5Types.Vector, tile?:Tile) => {
    if(tile) {
      tile.position = position;
      this.get(position).enqueue(tile);
    }
  }

  get(position:p5Types.Vector):Queue<Tile> {
    return this.board[position.x][position.y];
  }


  render(){
    this.drawBackground();
    this.drawTiles();
  }

  drawBackground(){  
    const p5 = this.p5;
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

  drawTiles() {
    const p5 = this.p5;
    p5.stroke(0);
    p5.strokeWeight(1);
    for (let i = 0; i < this.xSize; i++) {
      for(let j = 0; j < this.ySize; j++) {
        const tileQueue = this.get(p5.createVector(i, j))
        const topTile = tileQueue.peek();
        if(topTile) {
          topTile.render(this.tileSize)
        }
      }
    }
  }
}