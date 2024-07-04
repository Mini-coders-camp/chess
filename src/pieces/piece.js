import board from '../board';

class Piece {
  constructor(row, column, side) {
    this.row = row;
    this.column = column;
    this.side = side; //'black' or 'white'
  }
  move(newRow, newColumn) {
    this.row = newRow;
    this.column = newColumn;
  }

  findLegalMoves() {}
}

export default Piece;
