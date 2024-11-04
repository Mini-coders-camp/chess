import Pawn from './pieces/pawn';
import Bishop from './pieces/bishop';
import Square from './square';
import Rook from './pieces/rook';
import King from './pieces/king';
import Queen from './pieces/queen';

class Board {
  constructor() {
    this.element = document.getElementById('board');
    this.squares = Array.from(Array(8), () => Array(8));
    this.selectedSquare = null;
    this.legalMoves = [];
    this.currentTurn = 'white';

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

    if (this.selectedSquare && clickedSquare !== this.selectedSquare) {
      if (this.legalMoves.some(([legalRow, legalColumn]) => legalRow === row && legalColumn === column)) {
        this.movePiece(clickedSquare);
        this.forEachSquare((row, column) => this.getSquare(row, column).removeHighlight());
        this.selectedSquare = null;
        this.checkKingStatus();
        return;
      } else {
        this.forEachSquare((row, column) => this.getSquare(row, column).removeHighlight());
        this.selectedSquare = null;
      }
    }

    if (!piece || piece.side !== this.currentTurn) return;

    this.legalMoves = piece.findLegalMoves(this);

    if (this.legalMoves.length === 0) {
      clickedSquare.highlightNoMoves();
      return;
    }

    this.selectedSquare = clickedSquare;

    for (const [targetRow, targetColumn] of this.legalMoves) {
      const targetSquare = this.getSquare(targetRow, targetColumn);
      targetSquare.toggleHighlight();
    }
  }

  checkKingStatus() {
    const isKingInCheck = this.isKingInCheck();
    if (isKingInCheck) {
      this.highlightTheSquareIfPieceIsIinDanger(isKingInCheck);
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

    this.currentTurn = this.currentTurn === 'white' ? 'black' : 'white';

    const isKingInCheck = this.isKingInCheck();
    if (isKingInCheck) {
      this.highlightTheSquareIfPieceIsIinDanger(isKingInCheck);
    }
  }

  setPiecesOnStartingPositions() {
    this.setPiece(new Rook(7, 0, 'white'));
    this.setPiece(new Rook(7, 7, 'white'));
    this.setPiece(new Rook(0, 7, 'black'));
    this.setPiece(new Rook(0, 0, 'black'));

    /***** Pawns *****/
    for (let i = 0; i < 8; i++) {
      this.setPiece(new Pawn(6, i, 'white'));
      this.setPiece(new Pawn(1, i, 'black'));
    }

    /***** Bishops *****/
    this.setPiece(new Bishop(7, 2, 'white'));
    this.setPiece(new Bishop(7, 5, 'white'));
    this.setPiece(new Bishop(0, 2, 'black'));
    this.setPiece(new Bishop(0, 5, 'black'));

    /***** King *****/


    this.setPiece(new King(0, 4, 'black'));
    this.setPiece(new King(7, 4, 'white'));

    /***** Queen *****/
    this.setPiece(new Queen(0, 3, 'black'));
    this.setPiece(new Queen(7, 3, 'white'));
  }

  setPiece(piece) {
    this.getSquare(piece.row, piece.column).piece = piece;
  }

  getPieces() {
    const pieces = [];
    this.forEachSquare((row, column) => {
      const piece = this.getSquare(row, column).piece;
      if (piece) {
        pieces.push(piece);
      }
    });
    return pieces;
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

  isKingInCheck() {
    let kingsPosition = this.findTheKingsPosition();
    let whiteKingInCheck = false;
    let blackKingInCheck = false;

    const pieces = this.getPieces();
    pieces.forEach((piece) => {
      const futureMoves = piece.findLegalMoves(this);
      for (const [futureMoveRow, futureMoveColumn] of futureMoves) {
        if (futureMoveRow === kingsPosition[0][0] && futureMoveColumn === kingsPosition[0][1]) {
          whiteKingInCheck = true;
        }
        if (futureMoveRow === kingsPosition[1][0] && futureMoveColumn === kingsPosition[1][1]) {
          blackKingInCheck = true;
        }
      }
    });

    if (whiteKingInCheck) {
      return kingsPosition[0];
    } else if (blackKingInCheck) {
      return kingsPosition[1];
    } else {
      return null;
    }
  }

  findTheKingsPosition() {
    let whiteKingPosition, blackKingPosition;
    this.forEachSquare((row, column) => {
      const piece = this.getSquare(row, column).piece;
      if (piece?.name === 'king') {
        if (piece.side === 'white') {
          whiteKingPosition = [row, column];
        } else {
          blackKingPosition = [row, column];
        }
      }
    });
    return [whiteKingPosition, blackKingPosition];
  }

  highlightTheSquareIfPieceIsIinDanger([row, column]) {
    const squareOfPieceInDanger = this.getSquare(row, column);
    squareOfPieceInDanger.checkHighlight();
  }
}

export default Board;
