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
  }

  checkHighlight() {
    this.element.classList.toggle('check');
  }
}

export default Square;
