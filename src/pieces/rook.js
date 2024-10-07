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

    for (const { row, col } of directions) {
      for (let distance = 1; distance < 8; distance++) {
        const newRow = this.row + distance * row;
        const newCol = this.column + distance * col;
        const destination = [newRow, newCol]

        if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;

        const targetSquare = board.getSquare(newRow, newCol);
        const targetSquareIsEmpty = !targetSquare.piece
        const targetSquareIsOccupiedByTheOpponentsPiece = targetSquare.piece?.side !== this.side

        if (targetSquareIsEmpty) {
          possibleMoves.push(destination);
        } else if (targetSquareIsOccupiedByTheOpponentsPiece) {
          possibleMoves.push(destination);
          break;
        } else if (!targetSquareIsOccupiedByTheOpponentsPiece) {
          break;
        }        
      }
    }
    return possibleMoves;
  }
}

export default Rook;
