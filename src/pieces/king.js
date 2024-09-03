import Piece from './piece';

class King extends Piece {
  constructor(row, column, side) {
    super(row, column, side);
    this.name = 'king';
    this.display = `<i class="fas fa-chess-king ${side}"></i>`; //fontawesome king
  }
  findLegalMoves(board) {
    const possibleMoves = [];
    const directions = [
      [0, -1],  // left
      [0, 1],   // right
      [-1, 0],  // down
      [1, 0],   // up
      [1, 1],   // up right
      [-1, -1], // down left
      [1, -1],  // up left
      [-1, 1],  // down right   
    ];

    directions.forEach(directions => {
      const newRow = this.row + directions[0];
      const newColumn = this.column + directions[1];

      if (newRow >=0 && newRow <=7 && newColumn >= 0 && newColumn <= 7) {
        const targetSquare = board.getSquare(newRow, newColumn);
        if (!targetSquare.piece || targetSquare.piece.side !== this.side) {
          possibleMoves.push([newRow, newColumn]);
        }           
      }
    });

    return possibleMoves;
  }
}

export default King;