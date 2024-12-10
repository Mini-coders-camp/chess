import Pawn from './pieces/pawn';
import Square from './square';
import Knight from './pieces/knight';
import Piece from './pieces/piece';
import King from './pieces/king';
import Rook from './pieces/rook';
import Bishop from './pieces/bishop';
import Queen from './pieces/queen';

class Board {
  constructor() {
    this.element = document.getElementById('board');
    this.squares = Array.from(Array(8), () => Array(8));
    this.selectedSquare = null;
    this.legalMoves = [];

    this.forEachSquare((row, column) => {
      const square = new Square(row, column);
      this.squares[row][column] = square;
      this.element.appendChild(square.element);
      square.element.addEventListener('click', () => this.handleClick(row, column));
    });

    this.setPiecesOnStartingPositions();
  }

  handleClick(row, column) {
    const clickedSquare = this.getSquare(row, column);
    const piece = clickedSquare.piece;
    
    if (this.selectedSquare) {
      this.movePiece(clickedSquare);
      return;
    }

    if (!piece) return;

    this.selectedSquare = clickedSquare;
    this.legalMoves = piece.findLegalMoves(this); //sprawdzic set piece
    for (const [targetRow, targetColumn] of this.legalMoves) {
    const targetSquare = this.getSquare(targetRow, targetColumn);
    targetSquare.toggleHighlight();
    }
  }
  movePiece(targetSquare) {
    const isLegalMove = this.legalMoves.some(
      ([row, column]) => targetSquare.row === row && targetSquare.column === column,
    );
    if (!isLegalMove) return;

    const piece = this.selectedSquare.piece;
    let isp= piece.move(targetSquare.row, targetSquare.column);    
    targetSquare.piece = piece;
   // let isp=piece.move(targetSquare.row,targetSquare.column);
    if(Array.isArray(isp)) 
      {
        this.promotedPawn(isp,targetSquare);
      }
   // let nameOfPiece=piece.name;
    // if(targetSquare.row===0 || targetSquare.row===7 ){
    //   let isp=piece.move(targetSquare.row,targetSquare.column);
    //   console.log(isp);
    //  this.promotedPawn(isp,targetSquare);  
    //  }
      
    this.selectedSquare.removePiece();
    this.selectedSquare = null;
    this.forEachSquare((row, column) => this.getSquare(row, column).removeHighlight());
  }
  setPiecesOnStartingPositions() {
    let pawn = new Pawn(6, 0, 'white');
    this.setPiece(pawn);
    let pawn1=new Pawn(1,4,'white');
    this.setPiece(pawn1);
  
    this.setPiece(new Knight(7, 1, 'white'));
    this.setPiece(new Knight(7, 6, 'white'));
    this.setPiece(new Knight(0, 6, 'black'));
    this.setPiece(new Knight(0, 1, 'black'));
   
  }

  setPiece(piece) {
    this.getSquare(piece.row, piece.column).piece = piece;
  }

  getSquare(row, column) {
    return this.squares[row][column];
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

  forEachSquare(callback) {
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        callback(row, column);
      }
    }
  }
}

export default Board;
// zrobic nowy branch do piona 
// default hetmana
//