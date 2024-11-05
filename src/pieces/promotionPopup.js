class PromotionPopup {
  constructor(pawn) {
    this.pawn = pawn;
    this.popupElement = this.createPopup();
  }

  createPopup() {
    const popup = document.createElement('div');
    popup.promotionCss = 'promotion-popup';

    const options = ['queen', 'rook', 'knight', 'bishop'];
    options.forEach((option) => {
      const button = document.createElement('button');
      button.popupCss = `promotion-button ${option}`;
      button.innerHTML = `<i class="fas fa-chess-${option}"></i>`;
    });
  }
}

export default PromotionPopup;
