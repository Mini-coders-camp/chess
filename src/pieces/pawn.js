import Knight from './knight';
import Rook from './rook';
import Bishop from './bishop';
import Queen from './queen';
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
   move(targetSquare) {
    this.row=targetSquare.row;
    this.column=targetSquare.column;
    if(this.row===0 || this.row===7){
      const pawn=this.promote();
      this.promotedPawn(pawn,targetSquare);
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
  promotedPawn(pawn,targetSquare){
    const morphPiece= pawn;
    const NameOfNewPiece=morphPiece[0]
    switch (NameOfNewPiece) {
      case 'queen':
        let newQueen= new Queen(morphPiece[1],morphPiece[2],morphPiece[3]);
        targetSquare.removePiece(pawn);
        targetSquare.piece=newQueen;
        break;
      case 'bishop':
          let newBishop= new Bishop(morphPiece[1],morphPiece[2],morphPiece[3]);
          targetSquare.removePiece(pawn);
          targetSquare.piece=newBishop;
          break;
      case 'rook':
            let newRook= new Rook(morphPiece[1],morphPiece[2],morphPiece[3]);
            targetSquare.removePiece(pawn);
            targetSquare.piece=newRook;
            break;
      case 'knight':
              let newKnight= new Knight(morphPiece[1],morphPiece[2],morphPiece[3]);
              targetSquare.removePiece(pawn);
              targetSquare.piece=newKnight;
              break;
       default:
                console.log(`Sorry, we are out of your choice.`);
        
    }
   // console.log(newp);
    //newp.promote();
    /*let rowKing=pawn.row;
    let colKing=pawn.column;
    let sideKing=pawn.side;
    let newKing= new King(rowKing,colKing,sideKing);
    targetSquare.removePiece(pawn);
    targetSquare.piece=newKing;*/
}
  enPassant() {}
}

export default Pawn;
