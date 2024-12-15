import Piece from './piece';

class Queen extends Piece {
  constructor(row, column, side) {
    super(row, column, side);
    this.name = 'queen';
    this.display = `<i class="fas fa-chess-queen ${side}"></i>`; //fontawesome queen
  }
  findLegalMoves(board) {
    const possibleMoves = [];
    const directions = [
      [0, -1], // left
      [0, 1], // right
      [-1, 0], // down
      [1, 0], // up
      [1, 1], // up right
      [-1, -1], // down left
      [1, -1], // up left
      [-1, 1], // down right
    ];

    directions.forEach((directions) => {
      for (let distance = 1; distance < 8; distance++) {
        const newRow = this.row + distance * directions[0];
        const newColumn = this.column + distance * directions[1];

        if (newRow >= 0 && newRow <= 7 && newColumn >= 0 && newColumn <= 7) {
          const targetSquare = board.getSquare(newRow, newColumn);

          if (!targetSquare.piece) {
            possibleMoves.push([newRow, newColumn]);
            continue;
          }

          if (targetSquare.piece?.side !== this.side) {
            possibleMoves.push([newRow, newColumn]);
          }

          break;
        }
      }
    });

    return possibleMoves;
  }

  clone() {
    return new Queen(this.row, this.column, this.side);
  }
}

export default Queen;
