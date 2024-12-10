import Piece from './piece';

class King extends Piece {
  constructor(row, column, side) {
    super(row, column, side);
    this.name = 'king';
    this.display = `<i class="fas fa-chess-king ${side}"></i>`; //fontawesome king
    this.hasMoved = false; //król jeszcze się nie ruszył
  }
  findLegalMoves(board) {
    const possibleMoves = [];
    const directions = [
      [0, -1], // left
      [0, 1], // right
      [-1, 0], // down
      [1, 0], // up
      [1, 1], // down right
      [-1, -1], // up left
      [1, -1], // down left
      [-1, 1], // up right
    ];
    const row = this.row; // nie wiem czy potrzebne
    const column = this.column; // nie wiem czy potrzebne
    const side = this.side; // nie wiem czy potrzebne

    // dodanie standardowych ruchów króla
    directions.forEach((directions) => {
      const newRow = this.row + directions[0];
      const newColumn = this.column + directions[1];

      if (newRow >= 0 && newRow <= 7 && newColumn >= 0 && newColumn <= 7) {
        const targetSquare = board.getSquare(newRow, newColumn);
        if (targetSquare.piece?.side !== this.side) {
          possibleMoves.push([newRow, newColumn]);
        }
      }
    });
    return this.includeCastlingMoves(board, possibleMoves);
  }

  includeCastlingMoves(board, possibleMoves) {
    if (this.hasMoved) return possibleMoves;

    const row = this.row;
    const side = this.side;

    const addCastlingMove = (rookColumn, kingColumn, rookTarget, kingTarget) => {
      const rook = board.getSquare(row, rookColumn)?.piece;
      if (
        rook?.name === 'rook' &&
        !rook.hasMoved &&
        board.isPathClear(row, Math.min(rookColumn, kingColumn), Math.max(rookColumn, kingColumn)) &&
        !board.isSquareUnderAttack(row, kingColumn, side) &&
        !board.isSquareUnderAttack(row, rookTarget, side) &&
        !board.isSquareUnderAttack(row, kingTarget, side)
      ) {
        possibleMoves.push([row, kingTarget]); //dodaj ruch roszady
      }
    };

    addCastlingMove(7, 4, 5, 6); //krótka roszada
    addCastlingMove(0, 4, 3, 2); //długa roszada

    return possibleMoves;
  }
}
export default King;

/*return possibleMoves;
}
}

export default King;*/
