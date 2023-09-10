export const MATCH_STATES = {
  WAITING: 'waiting',
  READY: 'ready',
  PLAYING: 'playing',
  DONE: 'done'
}

class Match {
  constructor(name){
    this.players = [];
    this.name = name
    this.id = 0;
    this.state = MATCH_STATES.WAITING;
  }

  addPlayer(player){
    this.players.push(player);
    if(this.players.length === 2) {
      this.state = MATCH_STATES.READY;
    }
  }

  removePlayer(player){
    if(this.players.length && player) {
      this.players = this.players.filter(p => p.id !== player.id);
    }
  }
}

export default Match