import board from '../board';

class Piece {
  constructor(row, column, side) {
    this.row = row;
    this.column = column;
    this.side = side; //'black' or 'white'
  }
  move(newRow, newColumn) {
    console.log(`Ruch z: (${this.row}, ${this.column}) do: (${newRow}, ${newColumn})`);
    this.row = newRow;
    this.column = newColumn;
    console.log(`Nowa pozycja: (${this.row}, ${this.column})`);
  }

  findLegalMoves() {}
}

export default Piece;
