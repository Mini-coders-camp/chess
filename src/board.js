import Pawn from './pieces/pawn';
import Bishop from './pieces/bishop';
import Square from './square';

class Board {
  constructor() {
    this.element = document.getElementById('board');
    this.squares = Array.from(Array(8), () => Array(8));
    this.selectedSquare = null;
    this.legalMoves = [];

    this.forEachSquare((row, column) => {
      const square = new Square(row, column);
      this.squares[row][column] = square;
      this.element.appendChild(square.element);
      square.element.addEventListener('click', () => this.handleClick(row, column));
    });

    this.setPiecesOnStartingPositions();
  }

  handleClick(row, column) {
    const clickedSquare = this.getSquare(row, column);
    const piece = clickedSquare.piece;

    if (this.selectedSquare) {
      this.movePiece(clickedSquare);
      return;
    }

    if (!piece) return;

    this.selectedSquare = clickedSquare;
    this.legalMoves = piece.findLegalMoves();

    for (const [targetRow, targetColumn] of this.legalMoves) {
      const targetSquare = this.getSquare(targetRow, targetColumn);
      targetSquare.toggleHighlight();
    }
  }

  movePiece(targetSquare) {
    const isLegalMove = this.legalMoves.some(
      ([row, column]) => targetSquare.row === row && targetSquare.column === column,
    );

    if (!isLegalMove) return;

    const piece = this.selectedSquare.piece;
    piece.move(targetSquare.row, targetSquare.column);
    targetSquare.piece = piece;

    this.selectedSquare.removePiece();
    this.selectedSquare = null;

    this.forEachSquare((row, column) => this.getSquare(row, column).removeHighlight());
  }

  setPiecesOnStartingPositions() {
    let pawn = new Pawn(6, 0, 'white');
    let bishopLW = new Bishop(7, 2, 'white');
    let bishopRW = new Bishop(7, 5, 'white');

    this.setPiece(pawn);
    this.setPiece(bishopLW);
    this.setPiece(bishopRW);
  }

  setPiece(piece) {
    this.getSquare(piece.row, piece.column).piece = piece;
  }

  getSquare(row, column) {
    return this.squares[row][column];
  }

  forEachSquare(callback) {
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        callback(row, column);
      }
    }
  }
}

export default Board;
