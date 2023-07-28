import './App.css'
import PlayGame from './game/scene';
import Phaser from 'phaser';


export const config = {
  type: Phaser.AUTO,
  parent: "phaser",
  width: 800,
  height: 600,
  scene: PlayGame
};

const game = new Phaser.Game(config);


export default App
