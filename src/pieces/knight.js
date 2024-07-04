import Piece from './piece';

class Knight extends Piece {
  constructor(row, column, side) {
    super(row, column, side);
    this.name = 'knight';
    this.display = `<i class="fas fa-chess-knight ${side}"></i>`; //fontawesome knight
  }
  findLegalMoves() {
    const possibleMoves = [];

    return possibleMoves;
  }
}

export default Knight;
