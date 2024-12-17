import Knight from './knight';
import Rook from './rook';
import Bishop from './bishop';
import Queen from './queen';
import Piece from './piece';

class Pawn extends Piece {
  constructor(row, column, side) {
    super(row, column, side);
    this.name = 'pawn';
    this.display = `<i class="fas fa-chess-pawn ${side}"></i>`;
  }

  findLegalMoves(board) {
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
  move(targetSquare) {
    this.row = targetSquare.row;
    this.column = targetSquare.column;
    if (this.row === 0 || this.row === 7) {
      this.promote(targetSquare);
    }
  }

  promote(targetSquare) {
    const changePiece = prompt('What piece do you want to choose: queen, bishop, rook, knight');
    const newPieceName = changePiece.toLowerCase().trim();

    const pieceNameToPieceMap = {
      bishop: Bishop,
      rook: Rook,
      knight: Knight,
      queen: Queen,
    };

    const Piece = pieceNameToPieceMap[newPieceName];
    const piece = new Piece(this.row, this.column, this.side);
    targetSquare.removePiece();
    targetSquare.piece = piece;
  }

  enPassant() {}
}

export default Pawn;
