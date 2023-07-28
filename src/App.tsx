import './App.css'
import PlayGame from './game/scene';
import Phaser from 'phaser';
import Boot from './game/Boot';
import Preloader from './game/Preloader';

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    backgroundColor: '#3366b2',
    parent: 'phaser-example',
    scene: [ Boot, Preloader/*, MainMenu, MainGame */],
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    }
};

const game = new Phaser.Game(config);


function App() {

  return (
     <div></div>
  )
}

export default App
