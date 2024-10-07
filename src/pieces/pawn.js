import Piece from './piece';
import Board from '../board';
class Pawn extends Piece {
  constructor(row, column, side) {
    super(row, column, side);
    this.name = 'pawn';
    this.display = `<i class="fas fa-chess-pawn ${side}"></i>`;
  }

  findLegalMoves(board) {
    const possibleMoves = [];

    if (this.side === 'white') {
      for (let i = 1; i <= 1; i++) {
        if (this.row - 1 >= 0) {
          if (board.getSquare(this.row - i, this.column).piece == null) {
            possibleMoves.push([this.row - 1, this.column]);
            if (i === 1 && this.row === 6 && board.getSquare(this.row - 2, this.column).piece == null) {
              possibleMoves.push([this.row - 2, this.column]);
            }
          } else {
            break;
          }
        }
      }
      for (let i = 1; i <= 1; i++) {
        if (this.row - i >= 0 && this.column - i >= 0) {
          if (board.getSquare(this.row - i, this.column - i).piece) {
            if (board.getSquare(this.row - i, this.column - i).piece.side !== this.side) {
              possibleMoves.push([this.row - i, this.column - i]);
            }
            break;
          }
        }
      }

      for (let i = 1; i <= 1; i++) {
        if (this.row - i >= 0 && this.column + i <= 7) {
          if (board.getSquare(this.row - i, this.column + i).piece) {
            if (board.getSquare(this.row - i, this.column + i).piece.side !== this.side) {
              possibleMoves.push([this.row - i, this.column + i]);
            }
            break;
          }
        }
      }
    }
    if (this.side === 'black') {
      for (let i = 1; i <= 1; i++) {
        if (this.row + 1 <= 7) {
          if (board.getSquare(this.row + i, this.column).piece == null) {
            possibleMoves.push([this.row + 1, this.column]);
            if (i === 1 && this.row === 1 && board.getSquare(this.row + 2, this.column).piece == null) {
              possibleMoves.push([this.row + 2, this.column]);
            }
          } else {
            break;
          }
        }
      }

      for (let i = 1; i <= 1; i++) {
        if (this.row + i <= 7 && this.column + i <= 7) {
          if (board.getSquare(this.row + i, this.column + i).piece) {
            if (board.getSquare(this.row + i, this.column + i).piece.side !== this.side) {
              possibleMoves.push([this.row + i, this.column + i]);
            }
            break;
          }
        }
      }

      for (let i = 1; i <= 1; i++) {
        if (this.row + i <= 7 && this.column - i >= 0) {
          if (board.getSquare(this.row + i, this.column - i).piece) {
            if (board.getSquare(this.row + i, this.column - i).piece.side !== this.side) {
              possibleMoves.push([this.row + i, this.column - i]);
            }
            break;
          }
        }
      }
    }

    return possibleMoves;
  }

  promote() {}
  enPassant() {}
}

export default Pawn;
