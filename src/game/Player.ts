import { Queue } from "../utils/Queue"
import Board from "./Board";
import {Tile} from "./Tiles"
import p5Types from "p5";
import { emitter } from "../utils/Events";


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
  playerId: number;
  feed: Queue<Tile>;
  cursor: p5Types.Vector;
  color: p5Types.Color;
  controls: Controls;
  bank: (Tile | undefined)[];

  constructor(p5: p5Types, id: number, startPosition: p5Types.Vector, color: p5Types.Color, controls: Controls){
    this.playerId = id
    this.feed = new Queue<Tile>();
    this.bank = []
    this.cursor = startPosition;
    this.color = color;
    this.controls = controls;
    this.initQueueAndBank(p5, 10)
  }

  initQueueAndBank = (p5: p5Types, numTiles:number) => {
    for(let i = 0; i < numTiles; i++) {
      this.feed.enqueue(new Tile(p5.createVector(0,0), this));
    }

    for(let j = 0; j < BANK_SIZE; j++) {
      this.bank.push(new Tile(p5.createVector(0,0), this));
    }
    emitter.emit('updateBank', this.playerId, this.bank)
  }

  handleKeyPress = (p5: p5Types, key:string, board:Board) => {
    const cursor = this.cursor;
    // move cursor
    if (key === this.controls.up) {
      this.moveCursor(p5.createVector(cursor.x, cursor.y - 1));
    } else if (key === this.controls.down) {
      this.moveCursor(p5.createVector(cursor.x, cursor.y + 1));
    } else if (key === this.controls.left) {
      this.moveCursor(p5.createVector(cursor.x - 1, cursor.y));
    } else if (key === this.controls.right) {
      this.moveCursor(p5.createVector(cursor.x + 1, cursor.y));
    } 
    // place tile
    else if(key === this.controls.placeTile1) {
      const tile = this.bank[0];
      this.bank[0] = this.feed.dequeue();
      this.placeTile(board, tile);
      emitter.emit('updateBank', this.playerId, this.bank)
    } else if(key === this.controls.placeTile2) {
      const tile = this.bank[1];
      this.bank[1] = this.feed.dequeue();
      this.placeTile(board, tile);
      emitter.emit('updateBank', this.playerId, this.bank)
    } else if(key === this.controls.placeTile3) {
      const tile = this.bank[2];
      this.bank[2] = this.feed.dequeue();
      this.placeTile(board, tile);
      emitter.emit('updateBank', this.playerId, this.bank)
    }
  }

  moveCursor = (position: p5Types.Vector) => {
    this.cursor = position;
  }

  render(p5: p5Types, tileSize: number, index: number){
    this.renderCursor(p5, tileSize);
    if(index === 0) {
      this.renderBank(p5, p5.createVector(10, 550), tileSize);
    } else {
      this.renderBank(p5, p5.createVector(450, 550), tileSize);
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

  renderBank(p5:p5Types, position: p5Types.Vector, tileSize:number) {
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
          p5.createVector(
            BANK_MARGIN * (i + 1) + (tileSize * i), 
            BANK_MARGIN
          )
        )
      }
    }
    p5.pop()
  }
}