import { Position } from "../utils";
import { Queue } from "../utils/Queue"
import Board from "./Board";
import Tile from "./Tile"
import p5Types from "p5";

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

  constructor(startPosition: Position, color: p5Types.Color, controls: Controls){
    this.feed = new Queue<Tile>();
    this.cursor = startPosition;
    this.color = color;
    this.controls = controls;
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
      this.placeTile(board);
    } else if(key === this.controls.placeTile2) {
      this.placeTile(board);
    } else if(key === this.controls.placeTile3) {
      this.placeTile(board);
    }
  }

  moveCursor = (position: Position) => {
    this.cursor = position;
  }

  render(p5: p5Types, tileSize: number){
    p5.fill(this.color);
    p5.rect(this.cursor.x * tileSize, this.cursor.y * tileSize, tileSize, tileSize);
  }

  // THIS IS WHERE YOU WERE 7/28/23
  /**
   * 
    ___ ___  _  _ _____ ___ _  _ _   _ ___ 
  / __/ _ \| \| |_   _|_ _| \| | | | | __|
 | (_| (_) | .` | | |  | || .` | |_| | _| 
  \___\___/|_|\_| |_| |___|_|\_|\___/|___|
                                          
   */
  placeTile = (board:Board) => {
    board.addTile(this.feed.dequeue(), this.cursor);
  }
}