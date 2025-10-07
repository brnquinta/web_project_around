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

    // Bind do método ESC
    this._handleEscClose = this._handleEscClose.bind(this);
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

  // Fecha com ESC
  _handleEscClose(event) {
    if (event.key === "Escape") {
      console.log("ESC pressionado - Fechando popup");
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

    // SOLUÇÃO: Cria um handler ESC específico para esta instância
    this._handleImageEscClose = (event) => {
      if (event.key === "Escape") {
        console.log("ESC no PopupWithImage - Fechando!");
        this.close();
      }
    };
  }

  open({ name, link }) {
    this._popupImage.src = link;
    this._popupImage.alt = name;

    // Remove qualquer listener anterior e adiciona o específico
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("keydown", this._handleImageEscClose);

    this.popup.classList.add("overlay--active");
    this.popup.classList.add("visible");

    document.addEventListener("keydown", this._handleImageEscClose);
  }

  close() {
    super.close();
    document.removeEventListener("keydown", this._handleImageEscClose);
  }
}

export { Popup, PopupWithImage };
