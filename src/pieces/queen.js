import Piece from './piece';

class Queen extends Piece {
  constructor(row, column, side) {
    super(row, column, side);
    this.name = 'queen';
    this.display = `<i class="fas fa-chess-queen ${side}"></i>`; //fontawesome queen
  }
  findLegalMoves() {
    const possibleMoves = [];

    return possibleMoves;
  }
}

export default Queen;
