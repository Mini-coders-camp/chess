import Piece from './piece';

class Pawn extends Piece {
  constructor(row, column, side) {
    super(row, column, side);
    this.name = 'pawn';
    this.display = `<i class="fas fa-chess-pawn ${side}"></i>`;
  }

  findLegalMoves(board) {
    const possibleMoves = [];
    
    if (this.side == 'white') {
      if (this.row - 1 >= 0) possibleMoves.push([this.row - 1, this.column]);
      if (this.row - 2 >= 0 && this.row == 6) possibleMoves.push([this.row - 2, this.column]);
    }

    if (this.side == 'black') {
      if (this.row + 1 <= 7) possibleMoves.push([this.row + 1, this.column]);
      if (this.row + 2 <= 7 && this.row == 1) possibleMoves.push([this.row + 2, this.column]);

    }

    return possibleMoves;
  }
   move(newRow, newColumn) {
    this.row=newRow;
    this.column=newColumn;
    if(this.row===0){
      const isPromoted=this.promote();
      return isPromoted;
    }
    if (this.row==7){
      const isPromoted= this.promote();
      return isPromoted;
    }
  }

  promote(board) {
    const piecePawn = this; 
    const changePiece=prompt('What piece do you want to choose: queen, bishop, rook, knight');
    const newPiece=changePiece.toLowerCase().trim();
    const arrp =[];
    const nameof=newPiece;
    arrp[0]=nameof;
    arrp[1]=piecePawn.row;
    arrp[2]=piecePawn.column;
    arrp[3]=piecePawn.side;
    return arrp;
    
  }
  enPassant() {}
}

export default Pawn;
