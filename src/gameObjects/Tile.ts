import { pickRandom } from "../utils";
import p5Types from 'p5'
import Player from "./Player";
import { PlayableTileTypeKeys, TileType, TileTypes } from "./TileTypes";
import GameObject from "./GameObject";


class Tile extends GameObject{
  position: p5Types.Vector;
  type: TileType;
  owner: Player;
  isPermanent: boolean = false;

  constructor(p5: p5Types, position:p5Types.Vector, owner: Player, type?: TileType){
    super(p5)
    this.position = position;
    this.type = type || pickRandom(PlayableTileTypeKeys);
    this.owner = owner;
    this.isPermanent = TileTypes[this.type]?.isPermanent || false;
  }

  draw(position?:p5Types.Vector){
    // render with player color
    if(position) {
      this.position = position
    }
    TileTypes[this.type].draw(this.p5, this)
  }

  /**
   * 
   * @returns true if the action has changed the position of the ball
   */
  action():boolean {
    const p5 = this.p5;
    const action = TileTypes[this.type].action
    return action(p5, this)
  }
}

export default Tile