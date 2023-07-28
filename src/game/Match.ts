import Board from "./Board";
import Player from "./Player";

export default class Match {
  board: Board;
  players: Player[];
  scoreboard: Map<Player, number>;
  winningScore: number;

  constructor(winningScore:number, players: Player[], board:Board){
    this.board = board;
    this.players = players;
    this.scoreboard = new Map<Player, number>(players.map(player => [player, 0]));
    this.winningScore = winningScore;
  }
}