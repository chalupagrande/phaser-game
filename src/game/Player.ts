import { Position } from "../utils";
import { Queue } from "../utils/Queue"
import Tile from "./Tile"

export default class Player {
  feed: Queue<Tile>;
  cursor: Position;

  constructor(startPosition: Position){
    this.feed = new Queue<Tile>();
    this.cursor = startPosition;
  }
}