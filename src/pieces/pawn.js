import Piece from './piece';

class Pawn extends Piece {
  constructor(row, column, side) {
    super(row, column, side);
    this.name = 'pawn';
    this.display = `<i class="fas fa-chess-pawn ${side}"></i>`;
  }

  findLegalMoves() {
    const possibleMoves = [];
    
    if (this.side == 'white') {
      if (this.row - 1 >= 0) possibleMoves.push([this.row - 1, this.column]);
      if (this.row - 2 >= 0 && this.row == 6) possibleMoves.push([this.row - 2, this.column]);
    }

    if (this.side == 'black') {
      if (this.row + 1 <= 7) possibleMoves.push([this.row + 1, this.column]);
      if (this.row + 2 <= 7 && this.row == 1) possibleMoves.push([this.row + 2, this.column]);
    }

    return possibleMoves;
  }

  promote() {}
  enPassant() {}
}

export default Pawn;
