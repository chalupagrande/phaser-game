import { Howl } from "howler";

export class Sounds {
  sound: Howl;
  constructor(){
    this.sound = new Howl({
      src: ['/phaser_sounds_2.m4a'],
      sprite: {
        yes: [1000, 800],
        meh: [3500, 800],
        pop: [4500, 800],
        ganggang: [10000,800]
      }
    });
  }

  play(sound: string){
    this.sound.play(sound)
  }
}

export default new Sounds()