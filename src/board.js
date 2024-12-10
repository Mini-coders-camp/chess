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
    this.isMoveInProgress = false; // Dodanie flagi

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

    const originalRow = piece ? piece.row : null; //1st definicja. drugi raz w movePiece
    const originalColumn = piece ? piece.column : null; //1st definicja. drugi raz w movePiece

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
      const castlingMove = piece instanceof King && Math.abs(targetSquare.column - originalColumn) === 2;

      if (castlingMove) {
        targetSquare.highlightCastle();
      } else {
        targetSquare.toggleHighlight();
      }
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

    const originalRow = piece.row; // Przechowuj oryginalne położenie bierki !! drugi raz zdefiniowane (1st w handleClick)
    const originalColumn = piece.column; // Przechowuj oryginalne położenie bierki !! drugi raz zdefiniowane (1st w handleClick)

    piece.move(targetSquare.row, targetSquare.column);
    targetSquare.piece = piece;

    //console.log('Pozycja kolumny bierki:', piece.column, 'Kolumna docelowa:', targetSquare.column); //pieceColumn i targetSquare.column wskazuja ta samą kolumnę a pieceColumn to powinna być aktualna pozycja bierki

    if (piece instanceof King && Math.abs(targetSquare.column - originalColumn) === 2) {
      console.log('Wywoływanie metody castle');
      const shortCastle = targetSquare.column > originalColumn;
      const rookColumn = shortCastle ? 7 : 0;
      const rook = this.getSquare(piece.row, rookColumn).piece;

      this.castle(piece, rook, shortCastle);
    }

    if ((piece instanceof King || piece instanceof Rook) && !piece.hasMoved) {
      piece.hasMoved = true;
    }

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
    //for (let i = 0; i < 8; i++) {
    //  this.setPiece(new Pawn(6, i, 'white'));
    //  this.setPiece(new Pawn(1, i, 'black'));
    //}

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

  isPathClear(row, startColumn, endColumn) {
    const [minColumn, maxColumn] =
      startColumn < endColumn ? [startColumn + 1, endColumn] : [endColumn + 1, startColumn];

    for (let column = minColumn; column < maxColumn; column++) {
      if (this.getSquare(row, column).piece) {
        return false; //pole nie jest puste
      }
    }
    return true;
  }

  isSquareUnderAttack(row, column, side) {
    if (this.isMoveInProgress) return false; // Jeśli ruch jest w trakcie, nie wykonuj żadnych działań

    this.isMoveInProgress = true; // Ustawiamy flagę, że ruch jest w trakcie
    try {
      const opponentSide = side === 'white' ? 'black' : 'white';
      const pieces = this.getPieces().filter((piece) => piece.side === opponentSide);

      for (const piece of pieces) {
        //console.log(`Figura ${piece.name} (${piece.row}, ${piece.column}) sprawdza pole (${row}, ${column})`);
        const legalMoves = piece.findLegalMoves(this);
        //console.log(`${piece.name} może wykonać ruchy:`, legalMoves);
        if (legalMoves.some(([r, c]) => r === row && c === column)) {
          //console.log(`Pole (${row}, ${column}) jest pod atakiem przez ${piece.name}`);
          return true;
        }
      }
      return false; //Pole nie jest pod atakiem
    } finally {
      this.isMoveInProgress = false; // Po zakończeniu ruchu, resetujemy flagę
    }
  }

  castle(king, rook, shortCastle) {
    //console.log('Metoda castle została wywołana');
    const row = king.row;
    const side = king.side;

    const columnsToCheck = shortCastle ? [4, 5, 6] : [4, 3, 2];
    //console.log(`Kolumny do sprawdzenia dla roszady: ${columnsToCheck}`);

    for (const column of columnsToCheck) {
      //console.log(`Sprawdzanie pola (${row}, ${column}) dla szacha`);
      if (this.isSquareUnderAttack(row, column, side)) {
        //console.log('Roszada niedozwolona - pole pod szachem', row, column, side);
        return;
      }
    }

    console.log('Roszada dozwolona');

    if (shortCastle) {
      king.move(row, 6);
      rook.move(row, 5);
    } else {
      king.move(row, 2);
      rook.move(row, 3);
    }

    this.getSquare(row, king.column).piece = king;
    this.getSquare(row, rook.column).piece = rook;

    this.getSquare(king.row, 4).removePiece();
    this.getSquare(row, shortCastle ? 7 : 0).removePiece();
  }
}

export default Board;
