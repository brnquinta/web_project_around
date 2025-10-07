export default class Card {
  constructor(name, link, handleImageClick) {
    // ← Adicione este parâmetro
    this._name = name;
    this._link = link;
    this._handleImageClick = handleImageClick; // ← Guarde a função
  }

  addCard() {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    cardElement.querySelector(".card__name").textContent = this._name;
    cardElement.querySelector(".card__photo").setAttribute("src", this._link);
    cardElement.querySelector(".card__photo").setAttribute("alt", this._name);

    this._setEventListeners(cardElement);
    return cardElement;
  }

  _setEventListeners(cardElement) {
    // botão de deletar
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
      this._handleDelete(cardElement);
    });

    // botão de like
    const likeButton = cardElement.querySelector(".card__button");
    const likeIcon = cardElement.querySelector(".card__icon");
    likeButton.addEventListener("click", () => {
      this._handleLike(likeIcon);
    });

    // Imagem - usa a função passada no construtor
    const cardPhoto = cardElement.querySelector(".card__photo");
    cardPhoto.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link); // ← Chama o popup corretamente
    });
  }

  _handleDelete(cardElement) {
    cardElement.remove();
  }

  _handleLike(likeIcon) {
    if (likeIcon.getAttribute("src").includes("heart_icon.png")) {
      likeIcon.setAttribute("src", "images/heart_icon_black.png");
    } else {
      likeIcon.setAttribute("src", "images/heart_icon.png");
    }
  }

  // REMOVA o método _HandleVisible completamente!
}
