class Square {
  #piece = null;

  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.element = document.createElement('div');

    const color = row % 2 === column % 2 ? 'light' : 'dark';
    this.element.classList.add('square', color);
  }

  set piece(piece) {
    this.#piece = piece;
    this.element.innerHTML = piece.display;
  }

  get piece() {
    return this.#piece;
  }

  removePiece() {
    this.#piece = null;
    this.element.innerHTML = '';
  }

  toggleHighlight() {
    this.element.classList.toggle('possibleMove');
  }

  removeHighlight() {
    this.element.classList.remove('possibleMove');
    this.element.classList.remove('check');
    this.element.classList.remove('castle');
  }

  checkHighlight() {
    this.element.classList.toggle('check');
  }

  highlightNoMoves() {
    this.element.classList.add('noLegalMoves');

    setTimeout(() => {
      this.element.classList.remove('noLegalMoves');
    }, 1000);
  }

  highlightCastle() {
    this.element.classList.add('castle');
  }
}

export default Square;
