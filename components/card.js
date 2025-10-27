export default class Card {
  constructor(cardData, handleImageClick, handleLikeClick, handleDelete) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._isLiked = cardData.isLiked;
    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDelete = handleDelete;
  }

  addCard() {
    const cardTemplate = document.querySelector("#card-template").content;
    this._element = cardTemplate.querySelector(".card").cloneNode(true); // 🛠️ Guardando referência ao elemento

    this._element.querySelector(".card__name").textContent = this._name;
    this._element.querySelector(".card__photo").setAttribute("src", this._link);
    this._element.querySelector(".card__photo").setAttribute("alt", this._name);

    this._likeIcon = this._element.querySelector(".card__icon");
    this._setLikeState();

    this._setEventListeners(this._element);
    return this._element;
  }

  _setEventListeners(cardElement) {
    // botão de deletar
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
      this._handleDelete(this);
    });

    // botão de like
    const likeButton = cardElement.querySelector(".card__button");
    likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    // clique na imagem
    const cardPhoto = cardElement.querySelector(".card__photo");
    cardPhoto.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  deleteCard() {
    this._element.remove(); // Função pública para remover do DOM
  }

  _setLikeState() {
    this._likeIcon.setAttribute(
      "src",
      this._isLiked ? "images/heart_icon_black.png" : "images/heart_icon.png"
    );
  }

  updateLikeState(isLiked) {
    this._isLiked = isLiked;
    this._setLikeState();
  }
}
