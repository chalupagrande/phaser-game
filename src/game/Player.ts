import { Queue } from "../utils/Queue"
import Board from "./Board";
import { GameOptions, GameState } from "./Game";
import {Tile} from "./Tiles"
import p5Types from "p5";

const BANK_SIZE = 3;

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
  p5: p5Types;
  updateGameState: (update: (gameState:GameState, options?: GameOptions) => GameState) => void
  playerId: number;
  feed: Queue<Tile>;
  cursor: p5Types.Vector;
  color: p5Types.Color;
  controls: Controls;
  bank: (Tile | undefined)[];
  score: number;

  constructor(
      p5: p5Types,
      updateGameStateFn:(newGameState:any) => {},
      id: number,
      startPosition: p5Types.Vector,
      color: p5Types.Color,
      controls: Controls
    ){
    this.p5 = p5;
    this.updateGameState = updateGameStateFn
    this.playerId = id
    this.feed = new Queue<Tile>();
    this.bank = []
    this.cursor = startPosition;
    this.color = color;
    this.controls = controls;
    this.score = 0;
    this.initQueueAndBank(10)
  }

  initQueueAndBank = (numTiles:number) => {
    const p5 = this.p5;
    for(let i = 0; i < numTiles; i++) {
      this.feed.enqueue(new Tile(p5, p5.createVector(0,0), this));
    }

    for(let j = 0; j < BANK_SIZE; j++) {
      this.bank.push(new Tile(p5, p5.createVector(0,0), this));
    }
    this.updatePlayerState();
  }

  handleKeyPress = (key:string, board:Board) => {
    this.moveCursor(key)
    this.placeTile(key, board);
  }


  placeTile(key: string, board:Board){
    if(key === this.controls.placeTile1) {
      const tile = this.bank[0];
      this.bank[0] = this.feed.dequeue();
      board.addTile(this.cursor, tile);
      this.updatePlayerState()
    } else if(key === this.controls.placeTile2) {
      const tile = this.bank[1];
      this.bank[1] = this.feed.dequeue();
      board.addTile(this.cursor, tile);
      this.updatePlayerState()
    } else if(key === this.controls.placeTile3) {
      const tile = this.bank[2];
      this.bank[2] = this.feed.dequeue();
      board.addTile(this.cursor, tile);
      this.updatePlayerState()
    }
  }

  moveCursor(key:string) {
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

  queueTile() {
    const p5 = this.p5;
    if(this.bank.length < BANK_SIZE) {
      this.bank.push(new Tile(p5, p5.createVector(0,0), this));
    } else {
      this.feed.enqueue(new Tile(p5, p5.createVector(0,0), this));
    }
  }

  incrementScore() {
    this.score = this.score + 1
    this.updatePlayerState()
  }

  updatePlayerState = () => {
    this.updateGameState((gameState:GameState)=> {
      if(gameState.players) {
        const playersCopy = [...gameState.players];
        playersCopy[this.playerId] = this;
        return { players: playersCopy }        
      }
      return gameState
    })
  }

  //   ___  ___    ___      _____ _  _  ___ 
  //  |   \| _ \  /_\ \    / /_ _| \| |/ __|
  //  | |) |   / / _ \ \/\/ / | || .` | (_ |
  //  |___/|_|_\/_/ \_\_/\_/ |___|_|\_|\___|

  update(gameState: GameState, options: GameOptions) {
    const {tileSize} = options;
    this.render(tileSize)
  }
                                        

  renderCursor(tileSize:number) {
    const p5 = this.p5;
    p5.stroke(this.color);
    p5.strokeWeight(this.playerId === 0 ? 5:3);
    p5.noFill()
    p5.rect(this.cursor.x * tileSize, this.cursor.y * tileSize, tileSize, tileSize);
  }

  render(tileSize: number){
    this.renderCursor(tileSize);
  }
}