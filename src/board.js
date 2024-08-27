import Pawn from './pieces/pawn';
import Bishop from './pieces/bishop';
import Square from './square';
import Rook from './pieces/rook';
import King from './pieces/king';

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
    this.legalMoves = piece.findLegalMoves(this);

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
    this.detectWhenKingIsInCheck();
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
    this.setPiece(new King(0, 3, 'black'));
    this.setPiece(new King(7, 3, 'white'));
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

  detectWhenKingIsInCheck() {    
    let kingsPosition = this.findingTheKingsPosition();

    // Sprawdzenie, czy któryś z królów jest w szachu
    let whiteKingInCheck = false;
    let blackKingInCheck = false;
    
    this.forEachSquare((row, column) => {
      const piece = this.getSquare(row, column).piece;
      if(piece) {
        const futureMoves = piece.findLegalMoves(this);
        for (const [futureMoveRow, futureMoveColumn] of futureMoves) {
          if (futureMoveRow === kingsPosition[0][0] && futureMoveColumn === kingsPosition[0][1]) {
            whiteKingInCheck = true;
          }
          if (futureMoveRow === kingsPosition[1][0] && futureMoveColumn === kingsPosition[1][1]) {
            blackKingInCheck = true;
          } 
        }
      } 
    });
    this.markingTheKingInCheck(whiteKingInCheck, blackKingInCheck, kingsPosition);    
  }

  findingTheKingsPosition() {
    let whiteKingPosition, blackKingPosition;

    // Znalezienie pozycji królów
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

  markingTheKingInCheck(whiteKingInCheck, blackKingInCheck, kingsPosition) {    
    // Usunięcie czerwonych pól 
    this.forEachSquare((row, column) => {
      this.getSquare(row, column).removeCheckHighlight();
    });

    // Oznaczenie królow w szachu
    if (whiteKingInCheck) {
      alert("Biały król jest w szachu!");
      this.getSquare(kingsPosition[0][0], kingsPosition[0][1]).checkHighlight();
    }

    if (blackKingInCheck) {
      alert("Czarny król jest w szachu!");
      this.getSquare(kingsPosition[1][0], kingsPosition[1][1]).checkHighlight();
    } 
  }
}

export default Board;
