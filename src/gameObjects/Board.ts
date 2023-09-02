import { Queue } from "../utils/Queue";
import Game from "./Game";
import GameObject from "./GameObject";
import Tile from "./Tile";
import p5Types from "p5";

export default class Board extends GameObject{
  xSize: number;
  ySize: number;
  width: number;
  height: number;
  tileSize: number;
  board: Queue<Tile>[][];
  goalTiles: Tile[];

  constructor(p5: p5Types, xSize:number, ySize:number, tileSize:number, goalTiles: Tile[]) {
    super(p5)
    this.xSize = xSize;
    this.ySize = ySize;
    this.width = xSize * tileSize
    this.height = ySize * tileSize
    this.tileSize = tileSize;
    this.board = [];
    this.goalTiles = goalTiles;
    this.initBoard(); 
  }

  initBoard = () => {
    const {boardQueueSize} = Game.getGameSettings()
    for (let i = 0; i < this.xSize; i++) {
      this.board.push([]);
      for (let j = 0; j < this.ySize; j++) {
        this.board[i].push(new Queue<Tile>(boardQueueSize));
      }
    } 
    this.goalTiles.forEach(tile => {
      this.addTile(tile.position, tile)
    })
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

  reset() {
    this.board = []
    this.initBoard()
  }


  draw(){
    this.drawBackground();
    this.drawTiles();
  }

  drawBackground(){  
    const p5 = this.p5;
    p5.push()
    p5.stroke(0);
    p5.strokeWeight(1);
    for (let i = 0; i < this.xSize; i++) {
      for(let j = 0; j < this.ySize; j++) {
        p5.push()
        p5.noFill();
        p5.drawingContext.shadowBlur = 20;
        p5.drawingContext.shadowColor = `rgb(145,26,238)`;
        p5.stroke(145,26,238)
        p5.rect(i * this.tileSize, j * this.tileSize, this.tileSize, this.tileSize);
        p5.pop()
      }
    }
    p5.pop()
  }

  drawTiles() {
    const p5 = this.p5;
    p5.push()
    p5.stroke(0);
    p5.strokeWeight(1);
    for (let i = 0; i < this.xSize; i++) {
      for(let j = 0; j < this.ySize; j++) {
        const tileQueue = this.get(p5.createVector(i, j))
        const topTile = tileQueue.peek();
        if(topTile) {
          topTile.draw()
        }
      }
    }
    p5.pop()
  }
}