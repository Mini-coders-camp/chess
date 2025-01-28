import Piece from './piece';

class Knight extends Piece {
  constructor(row, column, side) {
    super(row, column, side);
    this.name = 'knight';
    this.display = `<i class="fas fa-chess-knight ${side}"></i>`; //fontawesome knight
  
  }
  
  findLegalMoves(board) {
    const possibleMoves = [];

    const moves=[[-1,-2],[-2,-1],[-2,1],[-1,2],[1,-2],[1,2],[2,1],[2,-1]];

    for (let i=0;i<moves.length;i++){
        
        const rowOffset = moves[i][0];
        const columnOffset = moves[i][1];
        if(this.row+rowOffset>=0 && this.row+rowOffset<8 && this.column+columnOffset>=0 && this.column+columnOffset<8){
          const targetSquare = board.getSquare(this.row+rowOffset, this.column+columnOffset);
        const isFill = targetSquare.piece;
        const colorOfPiece=targetSquare.piece?.side;
        if(!isFill || colorOfPiece!==this.side)
          possibleMoves.push([this.row+rowOffset,this.column+columnOffset]);

        }
                   

    }

    return possibleMoves;
  } 

}

export default Knight;
