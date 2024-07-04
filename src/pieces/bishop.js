import Piece from './piece';

class Bishop extends Piece {
  constructor(row, column, side) {
    super(row, column, side);
    this.name = 'bishop';
    this.display = `<i class="fas fa-chess-bishop ${side}"></i>`; //fontawesome bishop
  }
  findLegalMoves() {
    const possibleMoves = [];

    return possibleMoves;
  }
}

export default Bishop;
