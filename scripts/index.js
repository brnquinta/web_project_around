import FormValidation from "./FormValidation.js";
import Card from "./card.js";
import Overlay from "./utils.js";

// ==================== PERFIL ====================

const editButton = document.querySelector(".profile__button-edit");
const formSection = document.querySelector(".form");
const formOverlay = document.querySelector(".form__overlay");
const formCloseButton = formOverlay.querySelector(".form__close-button");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const editName = formSection.querySelector(".form__name");
const editProfession = formSection.querySelector(".form__profession");
const buttonSubmit = formSection.querySelector(".form__button-submit");

const editOverlay = new Overlay(".form__overlay");

editButton.addEventListener("click", () => {
  editOverlay.open(0);
  editName.setAttribute("placeholder", profileName.textContent);
  editProfession.setAttribute("placeholder", profileProfession.textContent);
});

formCloseButton.addEventListener("click", () => editOverlay.close(0));

buttonSubmit.addEventListener("click", () => {
  const name = editName.value;
  const profession = editProfession.value;

  if (name && profession !== "") {
    profileName.textContent = name;
    profileProfession.textContent = profession;
    editOverlay.close(0);
  }
});

formOverlay.addEventListener("click", (event) => {
  if (event.target.classList.contains("form__overlay")) editOverlay.close(0);
});

// ==================== CRIAÇÃO DE CARDS ====================

const formAddSection = document.querySelector(".form-add");
const createButton = document.querySelector(".profile__button-add");
const formAddOverlay = document.querySelector(".form-add__overlay");
const formAddCloseButton = formAddSection.querySelector(
  ".form-add__close-button"
);
const formCreateButton = formAddSection.querySelector(
  ".form-add__button-submit"
);
const formPlaceInput = formAddSection.querySelector(".form__place");
const formUrlInput = formAddSection.querySelector(".form__url");
const galleryContainer = document.querySelector(".gallery__content");

const addOverlay = new Overlay(".form-add__overlay");

createButton.addEventListener("click", () => addOverlay.open(0));
formAddCloseButton.addEventListener("click", () => addOverlay.close(0));
formAddOverlay.addEventListener("click", (event) => {
  if (event.target.classList.contains("form-add__overlay")) addOverlay.close(0);
});

formCreateButton.addEventListener("click", () => {
  const card = new Card(formPlaceInput.value, formUrlInput.value);
  const cardElement = card.addCard();
  galleryContainer.prepend(cardElement);
  addOverlay.close(0);

  const cardPhoto = cardElement.querySelector(".card__photo");
  const imagePopUpOverlay = document.querySelector(".image-popup__overlay");
  const imagePopUpPhoto = document.querySelector(".image-popup__photo");
  const imagePopUpName = document.querySelector(".image-popup__name");
  const cardName = cardElement.querySelector(".card__name").textContent;

  cardPhoto.addEventListener("click", () => {
    imagePopUpOverlay.classList.add("visible");
    imagePopUpPhoto.setAttribute("src", cardPhoto.getAttribute("src"));
    imagePopUpPhoto.setAttribute("alt", cardName);
    imagePopUpName.textContent = cardName;
  });
});

// Cards iniciais
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

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link);
  galleryContainer.prepend(card.addCard());
});

// ==================== POPUP DE IMAGEM ====================

const imagePopUpOverlay = document.querySelector(".image-popup__overlay");
const imagePopUpPhoto = document.querySelector(".image-popup__photo");

function closeCardPopUp() {
  imagePopUpOverlay.classList.remove("visible");
}

imagePopUpOverlay.addEventListener("click", closeCardPopUp);
imagePopUpPhoto.addEventListener("click", (event) => event.stopPropagation());

// ==================== FECHAR COM ESCAPE ====================

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    editOverlay.close(0);
    addOverlay.close(0);
    closeCardPopUp();
  }
});

// ==================== VALIDAÇÃO ====================
new FormValidation({
  formSelector: ".form, .form-add",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__button-submit",
  inactiveButtonClass: "form__button-submit--invalid",
  inputErrorClass: "form__item--invalid",
  errorClass: "form__validation",
});
