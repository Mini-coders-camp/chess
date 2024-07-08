import Piece from './piece';

class Bishop extends Piece {
  constructor(row, column, side) {
    super(row, column, side);
    this.name = 'bishop';
    this.display = `<i class="fas fa-chess-bishop ${side}"></i>`; //fontawesome bishop
  }
  findLegalMoves() {
    const possibleMoves = [];
    if (this.side == 'white') {
      for(let i = 0; i < 7; i++) {
        (this.row - i >= 0 && this.column - i >= 0) && possibleMoves.push([this.row - i, this.column - i]);
        (this.row - i >= 0 && this.column + i <= 7) && possibleMoves.push([this.row - i, this.column + i]);
        (this.row + i <= 7 && this.column + i <= 7) && possibleMoves.push([this.row + i, this.column + i]);
        (this.row + i <= 7 && this.column - i >= 0) && possibleMoves.push([this.row + i, this.column - i]);
      }
    }
    return possibleMoves;
  }
}

export default Bishop;
