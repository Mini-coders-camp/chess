import Pawn from './pawn';
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
    let moves_elements=[];

    for (let i=0;i<moves.length;i++){
        moves_elements = moves[i];
        const ROW = moves_elements[0];
        const COLUMN = moves_elements[1];
        if(this.row+ROW>=0 && this.row+ROW<8 && this.column+COLUMN>=0 && this.column+COLUMN<8){
          const targetSquare = board.getSquare(this.row+ROW, this.column+COLUMN);
        const isFill = targetSquare.piece;
        console.log(isFill);
        const colorOfPiece=targetSquare.piece?.side;
        if(isFill && colorOfPiece==this.side)
          continue;
        else {
          possibleMoves.push([this.row+ROW,this.column+COLUMN]);
        }

        }
                   

    }

    return possibleMoves;
  } 

}

export default Knight;
