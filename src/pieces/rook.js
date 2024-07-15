import Piece from './piece';

class Rook extends Piece {
  constructor(row, column, side) {
    super(row, column, side);
    this.name = 'rook';
    this.display = `<i class="fas fa-chess-rook ${side}"></i>`; //fontawesome rook
  }
  findLegalMoves() {
    const possibleMoves = [];
  for (let i = 1; i < 8; i++) {
      if (this.row - i >= 0) possibleMoves.push([this.row - i, this.column]);
    }
    return possibleMoves;
  }
}

export default Rook;
