import Piece from './piece';

class Knight extends Piece {
  constructor(row, column, side) {
    super(row, column, side);
    this.name = 'knight';
    this.display = `<i class="fas fa-chess-knight ${side}"></i>`; //fontawesome knight
  
  }
  findLegalMoves() {
    const possibleMoves = [];
   
      this.row-1>=0 && this.column-2>=0 && this.row-1<=7 && this.column-2<=7 && possibleMoves.push([this.row-1,this.column-2]);
      this.row-2>=0 && this.column-1>=0 && this.row-2<=7 && this.column-1<=7 && possibleMoves.push([this.row-2,this.column-1]);
      this.row-2>=0 && this.column+1>=0 && this.row-2<=7 && this.column+1<=7 && possibleMoves.push([this.row-2,this.column+1]);
      this.row-1>=0 && this.column+2>=0 && this.row-1<=7 && this.column+2<=7 && possibleMoves.push([this.row-1,this.column+2]);
      this.row+1>=0 && this.column-2>=0 && this.row+1<=7 && this.column-2<=7 && possibleMoves.push([this.row+1,this.column-2]);
      this.row+1>=0 && this.column+2>=0 && this.row+1<=7 && this.column+2<=7 && possibleMoves.push([this.row+1,this.column+2]);
      this.row+2>=0 && this.column+1>=0 && this.row+2<=7 && this.column+1<=7 && possibleMoves.push([this.row+2,this.column+1]);
      this.row+2>=0 && this.column-1>=0 && this.row+2<=7 && this.column-1<=7 && possibleMoves.push([this.row+2,this.column-1]);

    console.log(possibleMoves);
    return possibleMoves;
  }
}

export default Knight;
