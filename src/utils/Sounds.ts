import { Howl } from "howler";

export class Sounds {
  sound: Howl;
  constructor(){
    this.sound = new Howl({
      src: ['/phaser_sounds.m4a'],
      sprite: {
        tick: [500, 500],
        woosh: [1200, 500],
        goal: [2000, 700],
      }
    });
  }

  play(sound: string){
    this.sound.play(sound)
  }
}

export default new Sounds()