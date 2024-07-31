import Piece from './piece';
class Rook extends Piece {
  constructor(row, column, side) {
    super(row, column, side);
    this.name = 'rook';
    this.display = `<i class="fas fa-chess-rook ${side}"></i>`; //fontawesome rook
  }
  
  findLegalMoves(board) {
    const possibleMoves = [];   

    const directions = [
      { row: -1, col: 0 }, // Up
      { row: 1, col: 0 },  // Down
      { row: 0, col: -1 }, // Left
      { row: 0, col: 1 }   // Right
    ];

    for (const { row: dRow, col: dCol } of directions) {
      for (let i = 1; i < 8; i++) {
        const newRow = this.row + i * dRow;
        const newCol = this.column + i * dCol;

        if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;

        const targetSquare = board.getSquare(newRow, newCol);

        if (!targetSquare.piece) {
          possibleMoves.push([newRow, newCol]);
        } else if (targetSquare.piece?.side !== this.side) {
          possibleMoves.push([newRow, newCol]);
          break;
        } else if (targetSquare.piece?.side === this.side) {
          break;
        }               
      }
    }
    return possibleMoves;
  }
}

export default Rook;
