import { enableValidation } from "./validate.js";
import Card from "./card.js";
import Overlay from "./utils.js";

// ==================== PERFIL ====================

// Botões e elementos do perfil
const editButton = document.querySelector(".profile__button-edit");
const formSection = document.querySelector(".form");
const formOverlay = document.querySelector(".form__overlay");
const formCloseButton = formOverlay.querySelector(".form__close-button");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const editName = formSection.querySelector(".form__name");
const editProfession = formSection.querySelector(".form__profession");
const buttonSubmit = formSection.querySelector(".form__button-submit");

// Alteração: criar instância do Overlay específica para o formulário de perfil
const editOverlay = new Overlay(".form__overlay");

// Abrir overlay de edição de perfil
editButton.addEventListener("click", () => {
  editOverlay.open(0);
  editName.setAttribute("placeholder", profileName.textContent);
  editProfession.setAttribute("placeholder", profileProfession.textContent);
});

// Fechar overlay de perfil
formCloseButton.addEventListener("click", () => editOverlay.close(0));

// Submissão do formulário de edição de perfil
buttonSubmit.addEventListener("click", () => {
  const name = editName.value;
  const profession = editProfession.value;

  if (name && profession !== "") {
    profileName.textContent = name;
    profileProfession.textContent = profession;
    editOverlay.close(0);
  }
});

// Fechar clicando fora do overlay
formOverlay.addEventListener("click", (event) => {
  if (event.target.classList.contains("form__overlay")) editOverlay.close(0);
});

// ==================== CRIAÇÃO DE CARDS ====================

// Elementos do formulário de adicionar cartão
const formAddSection = document.querySelector(".form-add");
const createButton = document.querySelector(".profile__button-add");
const formAddOverlay = document.querySelector(".form-add__overlay");
const formAddWindow = formAddOverlay.querySelector(".form-add__content");
const formAddCloseButton = formAddSection.querySelector(
  ".form-add__close-button"
);
const formCreateButton = formAddSection.querySelector(
  ".form-add__button-submit"
);
const formPlaceInput = formAddSection.querySelector(".form__place");
const formUrlInput = formAddSection.querySelector(".form__url");
const galleryContainer = document.querySelector(".gallery__content");

// Alteração: criar instância do Overlay específica para o formulário de adicionar cartão
const addOverlay = new Overlay(".form-add__overlay");

// Abrir overlay de adicionar cartão
createButton.addEventListener("click", () => addOverlay.open(0));

// Fechar overlay de adicionar cartão
formAddCloseButton.addEventListener("click", () => addOverlay.close(0));

// Fechar clicando fora do overlay
formAddOverlay.addEventListener("click", (event) => {
  if (event.target.classList.contains("form-add__overlay")) addOverlay.close(0);
});

// Submissão do formulário de adicionar cartão
formCreateButton.addEventListener("click", () => {
  const card = new Card(formPlaceInput.value, formUrlInput.value);
  const cardElement = card.addCard();
  galleryContainer.prepend(cardElement);

  addOverlay.close(0);

  // Popup de imagem do card
  const cardPhoto = cardElement.querySelector(".card__photo");
  const imagePopUpOverlay = document.querySelector(".image-popup__overlay");
  const imagePopUpPhoto = document.querySelector(".image-popup__photo");
  const imagePopUpName = document.querySelector(".image-popup__name");
  const cardName = cardElement.querySelector(".card__name").textContent;

  cardPhoto.addEventListener("click", () => {
    imagePopUpOverlay.classList.add("visible");
    imagePopUpPhoto.classList.add("visible");
    imagePopUpPhoto.setAttribute("src", cardPhoto.getAttribute("src"));
    imagePopUpPhoto.setAttribute("alt", cardName);
    imagePopUpName.textContent = cardName;
    imagePopUpName.classList.add("visible");
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
const imagePopUpName = document.querySelector(".image-popup__name");
const imageCloseButton = document.querySelector(".image-popup__close-button");

function closeCardPopUp() {
  imagePopUpOverlay.classList.remove("visible");
  imagePopUpPhoto.classList.remove("visible");
  imagePopUpName.classList.remove("visible");
}

imageCloseButton.addEventListener("click", closeCardPopUp);
imagePopUpOverlay.addEventListener("click", closeCardPopUp);

// Evitar fechar popup clicando na própria imagem
imagePopUpPhoto.addEventListener("click", (event) => event.stopPropagation());

// ==================== FECHAR COM ESCAPE ====================

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    editOverlay.close(0); //
    addOverlay.close(0); //
    closeCardPopUp(); //
  }
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
