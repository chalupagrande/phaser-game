import { Direction, Position, Velocity } from "../utils";
import { Queue } from "../utils/Queue"
import Board from "./Board";
import Tile from "./Tile"
import p5Types from "p5";


const BANK_SIZE = 3;
const BANK_MARGIN = 5


export type Controls = {
  up: string,
  down: string,
  left: string,
  right: string
  placeTile1: string,
  placeTile2: string,
  placeTile3: string,
}

export default class Player {
  feed: Queue<Tile>;
  cursor: Position;
  color: p5Types.Color;
  controls: Controls;
  bank: (Tile | undefined)[];

  constructor(startPosition: Position, color: p5Types.Color, controls: Controls){
    this.feed = new Queue<Tile>();
    this.bank = []
    this.cursor = startPosition;
    this.color = color;
    this.controls = controls;
    this.initQueueAndBank(10)
  }

  initQueueAndBank = (numTiles:number) => {
    for(let i = 0; i < numTiles; i++) {
      this.feed.enqueue(new Tile(new Position(0,0), new Velocity(0, Direction.UP), false));
    }

    for(let j = 0; j < BANK_SIZE; j++) {
      this.bank.push(new Tile(new Position(0,0), new Velocity(0, Direction.UP), false));
    }
  }

  handleKeyPress = (key:string, board:Board) => {
    console.log("key pressed", key)
    if (key === this.controls.up) {
      this.moveCursor({x: this.cursor.x, y: this.cursor.y - 1});
    } else if (key === this.controls.down) {
      this.moveCursor({x: this.cursor.x, y: this.cursor.y + 1});
    } else if (key === this.controls.left) {
      this.moveCursor({x: this.cursor.x - 1, y: this.cursor.y});
    } else if (key === this.controls.right) {
      this.moveCursor({x: this.cursor.x + 1, y: this.cursor.y});
    } else if(key === this.controls.placeTile1) {
      const tile = this.bank[0];
      this.bank[0] = this.feed.dequeue();
      this.placeTile(board, tile);
    } else if(key === this.controls.placeTile2) {
      const tile = this.bank[1];
      this.bank[1] = this.feed.dequeue();
      this.placeTile(board, tile);
    } else if(key === this.controls.placeTile3) {
      const tile = this.bank[2];
      this.bank[2] = this.feed.dequeue();
      this.placeTile(board, tile);
    }
  }

  moveCursor = (position: Position) => {
    this.cursor = position;
  }

  render(p5: p5Types, tileSize: number, index: number){
    this.renderCursor(p5, tileSize);
    if(index === 0) {
      this.renderBank(p5, new Position(10, 550), tileSize);
    } else {
      this.renderBank(p5, new Position(450, 550), tileSize);
    }
  }

  placeTile = (board:Board, tile:Tile | undefined) => {
    if(tile) {
      board.addTile(tile, this.cursor);
    }
  }

  renderCursor(p5:p5Types, tileSize:number) {
    p5.stroke(this.color);
    p5.strokeWeight(3);
    p5.noFill()
    p5.rect(this.cursor.x * tileSize, this.cursor.y * tileSize, tileSize, tileSize);
  }

  renderBank(p5:p5Types, position: Position, tileSize:number) {
    p5.push()
    p5.translate(position.x, position.y);
    p5.stroke(0)
    // perimeter
    p5.rect(0,0, (tileSize * BANK_SIZE) + ((BANK_SIZE + 1) * BANK_MARGIN), tileSize + BANK_MARGIN * 2)

    // tiles
    for(let i = 0; i < BANK_SIZE; i++) {
      const tile = this.bank[i];
      if(tile) {
        tile.render(
          p5, 
          tileSize, 
          new Position(
            BANK_MARGIN * (i + 1) + (tileSize * i), 
            BANK_MARGIN
          )
        )
      }
    }
    p5.pop()
  }
}