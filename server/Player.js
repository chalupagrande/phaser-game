import {v4 as uuidv4} from 'uuid';

const PlayerState = {
    WAITING: 'waiting',
    READY: 'ready',
    PLAYING: 'playing',
    DONE: 'done'
}

class Player {
    constructor(name, socketId) {
        this.id = uuidv4();
        this.name = name;
        this.socketId = socketId;
        this.score = 0;
        this.state = PlayerState.WAITING;
    }

    addScore() {
        this.score++;
    }

    resetScore() {
        this.score = 0;
    }

    setSocketId(socketId) {
        this.socketId = socketId;
    }

    readyUp(){
        this.state = PlayerState.READY;
    }
}

export default Player