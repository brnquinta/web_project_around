// ==================== CLASSES DE POPUP ====================
class Popup {
  constructor(selector) {
    this.popup = document.querySelector(selector);

    // Botões de fechar dentro do popup
    this.closeButtons = this.popup.querySelectorAll(
      ".form__close-button, .form-add__close-button, .image-popup__close-button"
    );

    // Overlay é o próprio popup
    this.overlay = this.popup;
  }

  // Abre o popup
  open() {
    this.popup.classList.add("overlay--active");
    this.popup.classList.add("visible");
    document.addEventListener("keydown", this._handleEscClose);
  }

  // Fecha o popup
  close() {
    this.popup.classList.remove("overlay--active");
    this.popup.classList.remove("visible");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // Fecha com ESC - método base que pode ser sobrescrito
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  // Adiciona event listeners
  setEventListeners() {
    this.closeButtons.forEach((btn) =>
      btn.addEventListener("click", () => this.close())
    );

    this.overlay.addEventListener("click", (event) => {
      if (event.target === this.overlay) this.close();
    });
  }
}

class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImage = this.popup.querySelector(".image-popup__photo");

    // CORREÇÃO: Faz bind do método específico desta classe
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open({ name, link }) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    super.open();
  }

  // Método específico para PopupWithImage
  _handleEscClose(event) {
    if (event.key === "Escape") {
      super.close();
    }
  }
}

export { Popup, PopupWithImage };
