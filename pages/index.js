import Card from "../components/card.js";
import Overlay from "../utils/constants.js";
import {
  initialCards,
  cardsConfig,
  profileConfig,
} from "../utils/constants.js";
import FormValidation from "../components/FormValidation.js";
import { formValidationConfig } from "../utils/constants.js";
import Section from "../components/section.js";
import UserInfo from "../components/userInfo.js";

// ==================== VALIDAÇÃO ====================
new FormValidation(formValidationConfig);

// ==================== PERFIL ====================

const editButton = document.querySelector(".profile__button-edit");
const formOverlay = document.querySelector(".form__overlay");
const formCloseButton = formOverlay.querySelector(".form__close-button");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const editName = document.querySelector(".form .form__name");
const editProfession = document.querySelector(".form .form__profession");

// MUDE PARA O FORM REAL (que tem o botão)
const formSection = document.querySelector(".form .form__content");

const editOverlay = new Overlay(".form__overlay");

editButton.addEventListener("click", () => {
  editOverlay.open(0);
  editName.setAttribute("placeholder", profileName.textContent);
  editProfession.setAttribute("placeholder", profileProfession.textContent);
});

formCloseButton.addEventListener("click", () => editOverlay.close(0));

const userInfo = new UserInfo(
  document.querySelector(profileConfig.profileNameSelector),
  document.querySelector(profileConfig.profileProfessionSelector)
);

formSection.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = editName.value;
  const profession = editProfession.value;

  if (name && profession !== "") {
    console.log("botão clicado");
    userInfo.setUserInfo(name, profession);
    editOverlay.close(0);
    formSection.reset();
  }
});

formOverlay.addEventListener("click", (event) => {
  if (event.target.classList.contains("form__overlay")) editOverlay.close(0);
});

// ==================== CRIAÇÃO DE CARDS ====================

const createButton = document.querySelector(".profile__button-add");
const formAddOverlay = document.querySelector(".form-add__overlay");
const formAddCloseButton = formAddOverlay.querySelector(
  ".form-add__close-button"
);
const formPlaceInput = document.querySelector(".form-add .form__place");
const formUrlInput = document.querySelector(".form-add .form__url");

// MUDE PARA O FORM REAL (que tem o botão)
const formAddSection = document.querySelector(".form-add .form__content");

const addOverlay = new Overlay(".form-add__overlay");

// Criação da Section para os cards
const cardList = new Section(
  {
    items: initialCards,
  },
  cardsConfig.containerSelector
);

// Define o renderer após a criação
cardList.setRenderer((cardData) => {
  const card = new Card(cardData.name, cardData.link);
  const cardElement = card.addCard();
  cardList.addItem(cardElement);
});

// Renderiza os cards iniciais
cardList.renderItems();

createButton.addEventListener("click", () => addOverlay.open(0));
formAddCloseButton.addEventListener("click", () => addOverlay.close(0));
formAddOverlay.addEventListener("click", (event) => {
  if (event.target.classList.contains("form-add__overlay")) addOverlay.close(0);
});

formAddSection.addEventListener("submit", (event) => {
  event.preventDefault();
  const card = new Card(formPlaceInput.value, formUrlInput.value);
  const cardElement = card.addCard();
  cardList.addItem(cardElement);
  addOverlay.close(0);
  formAddSection.reset();
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
