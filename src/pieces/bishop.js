import Piece from './piece';
import Board from '../board';
class Bishop extends Piece {
  constructor(row, column, side) {
    super(row, column, side);
    this.name = 'bishop';
    this.display = `<i class="fas fa-chess-bishop ${side}"></i>`; //fontawesome bishop
  }
  findLegalMoves(board) {
    const possibleMoves = [];

    for (let i = 1; i < 8; i++) {
      if (this.row - i >= 0 && this.column - i >= 0) {
        if (board.getSquare(this.row - i, this.column - i).piece) {
          if (board.getSquare(this.row - i, this.column - i).piece.side !== this.side) {
            possibleMoves.push([this.row - i, this.column - i]);
          }
          break;
        }
        possibleMoves.push([this.row - i, this.column - i]);
      }
    }

    for (let i = 1; i < 8; i++) {
      if (this.row - i >= 0 && this.column + i <= 7) {
        if (board.getSquare(this.row - i, this.column + i).piece) {
          if (board.getSquare(this.row - i, this.column + i).piece.side !== this.side) {
            possibleMoves.push([this.row - i, this.column + i]);
          }
          break;
        }
        possibleMoves.push([this.row - i, this.column + i]);
      }
    }

    for (let i = 1; i < 8; i++) {
      if (this.row + i <= 7 && this.column - i >= 0) {
        if (board.getSquare(this.row + i, this.column - i).piece) {
          if (board.getSquare(this.row + i, this.column - i).piece.side !== this.side) {
            possibleMoves.push([this.row + i, this.column - i]);
          }
          break;
        }
        possibleMoves.push([this.row + i, this.column - i]);
      }
    }

    for (let i = 1; i < 8; i++) {
      if (this.row + i <= 7 && this.column + i <= 7) {
        if (board.getSquare(this.row + i, this.column + i).piece) {
          if (board.getSquare(this.row + i, this.column + i).piece.side !== this.side) {
            possibleMoves.push([this.row + i, this.column + i]);
          }
          break;
        }
        possibleMoves.push([this.row + i, this.column + i]);
      }
    }

    return possibleMoves;
  }
}

export default Bishop;
