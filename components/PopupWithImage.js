// PopupWithImage.js
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImage = this.popup.querySelector(".image-popup__photo");

    // Cria um handler ESC específico para esta instância
    this._handleImageEscClose = (event) => {
      if (event.key === "Escape") {
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
