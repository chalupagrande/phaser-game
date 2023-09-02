import { Queue } from "../utils/Queue"
import Tile from "./Tile"
import p5Types from "p5";
import GameObject from './GameObject'
import Game from './Game'
import sounds from '../utils/Sounds'


type Controls = {
  up: string,
  down: string,
  left: string,
  right: string
  placeTile1: string,
  placeTile2: string,
  placeTile3: string,
  placeTile4: string,
  placeTile5: string,
}

export default class Player extends GameObject {
  playerId: number;
  feed: Queue<Tile>;
  cursor: p5Types.Vector;
  color: [number, number, number];
  controls: Controls;
  bank: (Tile | undefined)[];
  score: number;
  initialCursorPosition: p5Types.Vector;

  constructor(
      p5: p5Types,
      id: number,
      startPosition: p5Types.Vector,
      color: [number, number, number],
      controls: Controls
    ){
    super(p5)
    this.playerId = id
    this.feed = new Queue<Tile>();
    this.bank = []
    this.cursor = startPosition;
    this.color = color;
    this.controls = controls;
    this.score = 0;
    const {feedSize} = Game.getGameSettings()
    this.initQueueAndBank(feedSize)
    this.initialCursorPosition = startPosition.copy()

  }

  initQueueAndBank = (numTiles:number) => {
    const {bankSize} = Game.getGameSettings()
    const p5 = this.p5;
    for(let i = 0; i < numTiles; i++) {
      this.feed.enqueue(new Tile(p5, p5.createVector(0,0), this));
    }

    for(let j = 0; j < bankSize; j++) {
      this.bank.push(new Tile(p5, p5.createVector(0,0), this));
    }

    sounds.play('ganggang')
  }

  handleKeyPress = (key:string) => {

    this.handleCursorKeyPress(key)
    this.handleTileKeyPress(key);
  }


  handleTileKeyPress(key: string){
    if(key === this.controls.placeTile1) {
      this.placeTile(0);
    } else if(key === this.controls.placeTile2) {
      this.placeTile(1);
    } else if(key === this.controls.placeTile3) {
      this.placeTile(2);
    }else if(key === this.controls.placeTile4) {
      this.placeTile(3);
    }else if(key === this.controls.placeTile5) {
      this.placeTile(4);
    }
  }

  placeTile(tile: number | Tile) {
    const {board} = Game.getGameState()
    if(typeof tile === 'number') {
      const tileBankIndex = tile
      const tyle = this.bank[tile]
      this.bank[tileBankIndex] = this.feed.dequeue();
      board.addTile(this.cursor, tyle);
      Game.updateHUD()
    } else {
      board.addTile(tile.position, tile);
      Game.updateHUD()
    }
  }

  handleCursorKeyPress(key:string) {
    const p5 = this.p5;
    const cursor = this.cursor;
    if (key === this.controls.up) {
      this.cursor = p5.createVector(cursor.x, cursor.y - 1);
    } else if (key === this.controls.down) {
      this.cursor = p5.createVector(cursor.x, cursor.y + 1);
    } else if (key === this.controls.left) {
      this.cursor = p5.createVector(cursor.x - 1, cursor.y);
    } else if (key === this.controls.right) {
      this.cursor = p5.createVector(cursor.x + 1, cursor.y);
    } 
  }

  givePlayerNewTile() {
    const p5 = this.p5;
    const {bankSize} = Game.getGameSettings()
    const bankCopy = this.bank.filter((el) => el !== undefined) 
    if(bankCopy.length < bankSize) {
      const emptyIndex = this.bank.findIndex((el) => el === undefined)
      this.bank[emptyIndex] = new Tile(p5, p5.createVector(0,0), this);
    } else {
      this.feed.enqueue(new Tile(p5, p5.createVector(0,0), this));
    }
    Game.updateHUD()
  }

  incrementScore() {
    this.score = this.score + 1
  }

  reset() {
    this.feed = new Queue<Tile>();
    this.bank = []
    this.cursor = this.initialCursorPosition
    const {feedSize} = Game.getGameSettings()
    this.initQueueAndBank(feedSize)
    Game.updateHUD()
  }

  //   ___  ___    ___      _____ _  _  ___ 
  //  |   \| _ \  /_\ \    / /_ _| \| |/ __|
  //  | |) |   / / _ \ \/\/ / | || .` | (_ |
  //  |___/|_|_\/_/ \_\_/\_/ |___|_|\_|\___|
                               
  drawCursor(tileSize:number) {
    const p5 = this.p5;
    p5.stroke(this.color);
    p5.strokeWeight(this.playerId === 0 ? 5:3);
    p5.noFill()
    p5.rect(this.cursor.x * tileSize, this.cursor.y * tileSize, tileSize, tileSize);
  }

  draw(){
    const {tileSize} = Game.getGameSettings()
    this.drawCursor(tileSize);
  }
}