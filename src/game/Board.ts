export default class Board {
  xSize: number;
  ySize: number;
  board: number[][][];

  constructor(xSize:number, ySize:number) {
    this.xSize = xSize;
    this.ySize = ySize;
    this.board = [];
    this.initBoard();  
  }

  initBoard = () => {
    for (let i = 0; i < this.xSize; i++) {
      this.board.push([]);
      for (let j = 0; j < this.ySize; j++) {
        this.board[i].push([]);
      }
    } 
  }
}


