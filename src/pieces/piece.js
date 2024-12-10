import board from '../board';

class Piece {
  constructor(row, column, side) {
    this.row = row;
    this.column = column;
    this.side = side; //'black' or 'white'
  }
    
  move(targetSquare) {
    this.row = targetSquare.row;
    this.column = targetSquare.column;
    targetSquare.piece = this;
  }

  findLegalMoves() {}
}

export default Piece;
