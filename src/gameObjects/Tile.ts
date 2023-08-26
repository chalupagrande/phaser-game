import { pickRandom } from "../utils";
import p5Types from 'p5'
import Player from "./Player";
import { PlayableTileTypeKeys, TileType, TileTypes } from "./TileTypes";
import GameObject from "./GameObject";
import Game from "./Game";


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

  render(position?:p5Types.Vector){
    const {tileSize} = Game.getGameSettings()
    const p5 = this.p5;
    const color = !this.isPermanent && this.owner ? this.owner.color: TileTypes[this.type].color
    // render with player color
    p5.fill(color[0], color[1], color[2]);
    if(position) {
      p5.rect(position.x, position.y, tileSize, tileSize);
    } else {
      p5.rect(this.position.x * tileSize, this.position.y * tileSize, tileSize, tileSize);
    }
  }

  /**
   * 
   * @returns true if the action has changed the position of the ball
   */
  action():boolean {
    const p5 = this.p5;
    const action = TileTypes[this.type].action
    return action(p5, this, Game)
  }
}

export default Tile