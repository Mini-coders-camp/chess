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
    const row = this.row;
    const column = this.column;

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

    // dodanie ruchów króla dla roszady
    const rookShort = board.getSquare(row, 7).piece;
    const rookLong = board.getSquare(row, 0).piece;

    // krótka roszada przy założeniu pustej ścieżki
    if (
      rookShort?.name === 'rook' &&
      !rookShort.hasMoved &&
      !this.hasMoved &&
      board.isPathClear(row, column, 7) &&
      !board.getSquare(row, column + 2).piece
    ) {
      possibleMoves.push([row, column + 2]); //docelowa pozycja króla przy krótkiej roszadzie
      console.log('Dodano krótką roszadę:', [row, column + 2]);
    }

    // długa roszada przy założeniu pustej ścieżki
    if (
      rookLong?.name === 'rook' &&
      !rookLong.hasMoved &&
      !this.hasMoved &&
      board.isPathClear(row, column, 0) &&
      !board.getSquare(row, column - 2).piece
    ) {
      possibleMoves.push([row, column - 2]); //docelowa pozycja króla przy długiej roszadzie
      console.log('Dodano długą roszadę:', [row, column - 2]);
    }

    return possibleMoves;
  }
}

export default King;
