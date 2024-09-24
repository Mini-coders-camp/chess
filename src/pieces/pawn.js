import Piece from './piece';

class Pawn extends Piece {
  constructor(row, column, side) {
    super(row, column, side);
    this.name = 'pawn';
    this.display = `<i class="fas fa-chess-pawn ${side}"></i>`;
  }

  findLegalMoves(board) {
    const possibleMoves = [];

    let nextRow;
    let startRow;

    if (this.side === 'white') {
      nextRow = this.row - 1;
      startRow = 6;
    } else if (this.side === 'black') {
      nextRow = this.row + 1;
      startRow = 1;
    }

    if (nextRow >= 0 && nextRow <= 7) {
      if (board.getSquare(nextRow, this.column).piece == null) {
        possibleMoves.push([nextRow, this.column]);

        const twoSquaresAhead = this.side === 'white' ? this.row - 2 : this.row + 2;
        if (this.row === startRow && board.getSquare(twoSquaresAhead, this.column).piece == null) {
          possibleMoves.push([twoSquaresAhead, this.column]);
        }
      }
    }

    const leftDiagonal = this.column - 1;
    if (nextRow >= 0 && leftDiagonal >= 0) {
      const leftPiece = board.getSquare(nextRow, leftDiagonal).piece;
      if (leftPiece && leftPiece.side !== this.side) {
        possibleMoves.push([nextRow, leftDiagonal]);
      }
    }

    const rightDiagonal = this.column + 1;
    if (nextRow >= 0 && rightDiagonal <= 7) {
      const rightPiece = board.getSquare(nextRow, rightDiagonal).piece;
      if (rightPiece && rightPiece.side !== this.side) {
        possibleMoves.push([nextRow, rightDiagonal]);
      }
    }
    return possibleMoves;
  }

  promote() {}
  enPassant() {}
}

export default Pawn;
