export default class Card {
  constructor(name, link) {
    this._name = name;
    this._link = link;
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

  // método privado para adicionar eventos
  _setEventListeners(cardElement) {
    // botão de deletar
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
      this._handleDelete(cardElement);
      console.log("botão clicado");
    });

    // botão de like
    const likeButton = cardElement.querySelector(".card__button");
    const likeIcon = cardElement.querySelector(".card__icon");
    likeButton.addEventListener("click", () => {
      this._handleLike(likeIcon);
    });

    this._HandleVisible(cardElement);
  }

  // método para deletar
  _handleDelete(cardElement) {
    cardElement.remove();
  }

  // método para dar like
  _handleLike(likeIcon) {
    if (likeIcon.getAttribute("src").includes("heart_icon.png")) {
      likeIcon.setAttribute("src", "images/heart_icon_black.png");
    } else {
      likeIcon.setAttribute("src", "images/heart_icon.png");
    }
  }

  _HandleVisible(cardElement) {
    const cardPhoto = cardElement.querySelector(".card__photo");
    const imagePopUpOverlay = document.querySelector(".image-popup__overlay");
    const imagePopUpPhoto = document.querySelector(".image-popup__photo");
    const imagePopUpName = document.querySelector(".image-popup__name");
    const cardName = cardElement.querySelector(".card__name").textContent;

    cardPhoto.addEventListener("click", () => {
      imagePopUpOverlay.classList.toggle("visible");
      imagePopUpPhoto.setAttribute("src", cardPhoto.getAttribute("src"));
      imagePopUpPhoto.setAttribute("alt", cardName);
      imagePopUpName.textContent = cardName;
      console.log("card clicado");
    });
  }
}
