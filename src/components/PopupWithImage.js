// PopupWithImage.js
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);

    // Seleciona a imagem dentro do popup
    this._popupImage = this.popup.querySelector(".image-popup__photo");
  }

  open({ name, link }) {
    // Define a URL da imagem e o texto alternativo
    this._popupImage.src = link;
    this._popupImage.alt = name;

    // Chama o método open() genérico da classe pai
    super.open();
  }
}
