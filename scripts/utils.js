// Overlay.js
export default class Overlay {
  constructor(selector) {
    // Pega todos os elementos que correspondem ao seletor
    this.overlays = document.querySelectorAll(selector);
  }

  // Abre o overlay
  open(index = 0) {
    if (this.overlays[index]) {
      this.overlays[index].classList.add("overlay--active");
    }
  }

  // Fecha o overlay
  close(index = 0) {
    if (this.overlays[index]) {
      this.overlays[index].classList.remove("overlay--active");
    }
  }

  // Adiciona evento de fechar para todos overlays e seus botões
  setCloseButtons(buttonSelector) {
    this.overlays.forEach((overlay) => {
      const closeButton = overlay.querySelector(buttonSelector);
      if (closeButton) {
        closeButton.addEventListener("click", () => {
          overlay.classList.remove("overlay--active");
        });
      }
    });
  }
}
