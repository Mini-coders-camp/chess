import Piece from './piece';

class King extends Piece {
  constructor(row, column, side) {
    super(row, column, side);
    this.name = 'king';
    this.display = `<i class="fas fa-chess-king ${side}"></i>`; //fontawesome king
  }
  findLegalMoves() {
    const possibleMoves = [];

    
      if (this.column - 1 >= 0) possibleMoves.push([this.row, this.column - 1]);
      if (this.column + 1 <= 7) possibleMoves.push([this.row, this.column + 1]);
      if (this.row - 1 >= 0) possibleMoves.push([this.row - 1, this.column]);
      if (this.row + 1 <= 7) possibleMoves.push([this.row + 1, this.column]);
      if (this.row + 1 <= 7 && this.column + 1 <= 7) possibleMoves.push([this.row + 1, this.column + 1]);
      if (this.row - 1 >= 0 && this.column - 1 >= 0) possibleMoves.push([this.row - 1, this.column - 1]);
      if (this.row + 1 <= 7 && this.column - 1 >= 0) possibleMoves.push([this.row + 1, this.column - 1]);
      if (this.row - 1 >= 0 && this.column + 1 <= 7) possibleMoves.push([this.row - 1, this.column + 1]);       
    
    return possibleMoves;
  }
}

export default King;