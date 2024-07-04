import Piece from './piece';

class Rook extends Piece {
  constructor(row, column, side) {
    super(row, column, side);
    this.name = 'rook';
    this.display = `<i class="fas fa-chess-rook ${side}"></i>`; //fontawesome rook
  }
  findLegalMoves() {
    const possibleMoves = [];

    return possibleMoves;
  }
}

export default Rook;
