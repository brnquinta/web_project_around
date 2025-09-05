import { enableValidation } from "./validate.js";

const editButton = document.querySelector(".profile__button-edit");
const formSection = document.querySelector(".form");
const formOverlay = formSection.querySelector(".form__overlay");
const formWindow = formOverlay.querySelector(".form__content");
const formCloseButton = formSection.querySelector(".form__close-button");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const editName = formSection.querySelector(".form__name");
const editProfession = formSection.querySelector(".form__profession");
const buttonSubmit = formSection.querySelector(".form__button-submit");

// Toggle edição perfil
editButton.addEventListener("click", () => {
  formOverlay.classList.toggle("visible");
  formWindow.classList.toggle("visible");
  editName.setAttribute("placeholder", profileName.textContent);
  editProfession.setAttribute("placeholder", profileProfession.textContent);
});

formCloseButton.addEventListener("click", () => {
  formOverlay.classList.remove("visible");
  formWindow.classList.remove("visible");
});

// Submissão edição perfil
buttonSubmit.addEventListener("click", () => {
  const name = editName.value;
  const profession = editProfession.value;

  if (name && profession !== "") {
    profileName.textContent = name;
    profileProfession.textContent = profession;
    formOverlay.classList.remove("visible");
    formWindow.classList.remove("visible");
  } else {
    alert("Preencha todos os campos!");
  }
});

// Formulário criar cartão
const formAddSection = document.querySelector(".form-add");
const createButton = document.querySelector(".profile__button-add");
const formAddOverlay = document.querySelector(".form-add__overlay");
const formAddWindow = formAddOverlay.querySelector(".form-add__content");
const formAddCloseButton = formAddSection.querySelector(
  ".form-add__close-button"
);

createButton.addEventListener("click", () => {
  formAddOverlay.classList.toggle("visible");
  formAddWindow.classList.toggle("visible");
});

formAddCloseButton.addEventListener("click", () => {
  formAddOverlay.classList.remove("visible");
  formAddWindow.classList.remove("visible");
});

const formCreateButton = formAddSection.querySelector(
  ".form-add__button-submit"
);
const formPlaceInput = formAddSection.querySelector(".form__place");
const formUrlInput = formAddSection.querySelector(".form__url");
const galleryContainer = document.querySelector(".gallery__content");

function addCard(placeInput, urlInput) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__name").textContent = placeInput;
  cardElement.querySelector(".card__photo").setAttribute("src", urlInput);
  cardElement.querySelector(".card__photo").setAttribute("alt", placeInput);
  galleryContainer.prepend(cardElement);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => cardElement.remove());

  const likeButton = cardElement.querySelector(".card__button");
  const likeIcon = cardElement.querySelector(".card__icon");
  likeButton.addEventListener("click", () => {
    if (likeIcon.getAttribute("src").includes("heart_icon.png")) {
      likeIcon.setAttribute("src", "images/heart_icon_black.png");
    } else {
      likeIcon.setAttribute("src", "images/heart_icon.png");
    }
  });

  const cardPhoto = cardElement.querySelector(".card__photo");
  const imagePopUpOverlay = document.querySelector(".image-popup__overlay");
  const imagePopUpPhoto = document.querySelector(".image-popup__photo");
  const imagePopUpName = document.querySelector(".image-popup__name");
  const cardName = cardElement.querySelector(".card__name").textContent;

  cardPhoto.addEventListener("click", () => {
    imagePopUpOverlay.classList.toggle("visible");
    imagePopUpPhoto.classList.toggle("visible");
    imagePopUpPhoto.setAttribute("src", cardPhoto.getAttribute("src"));
    imagePopUpPhoto.setAttribute("alt", cardName);
    imagePopUpName.textContent = cardName;
    imagePopUpName.classList.toggle("visible");
  });
}

formCreateButton.addEventListener("click", () => {
  addCard(formPlaceInput.value, formUrlInput.value);
  formAddOverlay.classList.remove("visible");
  formAddWindow.classList.remove("visible");

  console.log(imagePopUpOverlay.classList.contains("visible"));
});

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

initialCards.forEach((card) => addCard(card.name, card.link));

// Popup de imagem
const imageCloseButton = document.querySelector(".image-popup__close-button");
const imagePopUpOverlay = document.querySelector(".image-popup__overlay");
const imagePopUpPhoto = document.querySelector(".image-popup__photo");
const imagePopUpName = document.querySelector(".image-popup__name");

imageCloseButton.addEventListener("click", () => {
  imagePopUpOverlay.classList.remove("visible");
  imagePopUpPhoto.classList.remove("visible");
  imagePopUpName.classList.remove("visible");
});

imagePopUpOverlay.addEventListener("click", () => {
  imagePopUpOverlay.classList.remove("visible");
  imagePopUpPhoto.classList.remove("visible");
  imagePopUpName.classList.remove("visible");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    imagePopUpOverlay.classList.remove("visible");
    imagePopUpPhoto.classList.remove("visible");
    imagePopUpName.classList.remove("visible");
  }
});

imagePopUpPhoto.addEventListener("click", (event) => {
  event.stopPropagation();
});

// ==================== VALIDAÇÃO ====================
enableValidation({
  formSelector: ".form, .form-add",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__button-submit",
  inactiveButtonClass: "form__button-submit--invalid",
  inputErrorClass: "form__item--invalid",
  errorClass: "form__validation",
});
