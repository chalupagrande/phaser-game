export default class Preloader extends Phaser.Scene {
   loadText: Phaser.GameObjects.Text | undefined;

    constructor (){
        super('Preloader');
        this.loadText = undefined;
    }

    preload ()
    {
        this.loadText = this.add.text(512, 360, 'Loading ...', { fontFamily: 'Arial', fontSize: 74, color: '#e3f2ed' });
        this.loadText.setOrigin(0.5);
        this.loadText.setStroke('#203c5b', 6);
        this.loadText.setShadow(2, 2, '#2d2d2d', 4, true, false);

        // this.load.setPath('assets/games/snowmen-attack/');
        // this.load.image([ 'background', 'overlay', 'gameover', 'title' ]);
        // this.load.atlas('sprites', 'sprites.png', 'sprites.json');
        // this.load.glsl('snow', 'snow.glsl.js');

        // //  Audio ...
        // this.load.setPath('assets/games/snowmen-attack/sounds/');

        // this.load.audio('music', [ 'music.ogg', 'music.m4a', 'music.mp3' ]);
        // this.load.audio('throw', [ 'throw.ogg', 'throw.m4a', 'throw.mp3' ]);
        // this.load.audio('move', [ 'move.ogg', 'move.m4a', 'move.mp3' ]);
        // this.load.audio('hit-snowman', [ 'hit-snowman.ogg', 'hit-snowman.m4a', 'hit-snowman.mp3' ]);
        // this.load.audio('gameover', [ 'gameover.ogg', 'gameover.m4a', 'gameover.mp3' ]);
    }

}