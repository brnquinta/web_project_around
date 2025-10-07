import Card from "../components/card.js";
import { Popup, PopupWithImage } from "../components/Popup.js";
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

// ==================== POPUPS ====================

// Instâncias separadas de popup
const profilePopup = new Popup(".form__overlay");
profilePopup.setEventListeners();

const addCardPopup = new Popup(".form-add__overlay");
addCardPopup.setEventListeners();

const imagePopup = new PopupWithImage(".image-popup__overlay");
imagePopup.setEventListeners();

// ==================== PERFIL ====================
const editButton = document.querySelector(".profile__button-edit");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const editName = document.querySelector(".form .form__name");
const editProfession = document.querySelector(".form .form__profession");
const formSection = document.querySelector(".form .form__content");

const userInfo = new UserInfo(
  document.querySelector(profileConfig.profileNameSelector),
  document.querySelector(profileConfig.profileProfessionSelector)
);

editButton.addEventListener("click", () => {
  profilePopup.open();
  editName.value = profileName.textContent;
  editProfession.value = profileProfession.textContent;
});

formSection.addEventListener("submit", (event) => {
  event.preventDefault();
  userInfo.setUserInfo(editName.value, editProfession.value);
  profilePopup.close();
  formSection.reset();
});

// ==================== CARDS ====================
const createButton = document.querySelector(".profile__button-add");
const formPlaceInput = document.querySelector(".form-add .form__place");
const formUrlInput = document.querySelector(".form-add .form__url");
const formAddSection = document.querySelector(".form-add .form__content");

// Criação da Section para os cards
const cardList = new Section(
  { items: initialCards },
  cardsConfig.containerSelector
);

// Renderer dos cards
cardList.setRenderer((cardData) => {
  const card = new Card(cardData.name, cardData.link, imagePopup);
  cardList.addItem(card.addCard());
});

// Renderiza os cards iniciais
cardList.renderItems();

// Abrir popup adicionar card
createButton.addEventListener("click", () => addCardPopup.open());

formAddSection.addEventListener("submit", (event) => {
  event.preventDefault();
  const card = new Card(formPlaceInput.value, formUrlInput.value, imagePopup);
  cardList.addItem(card.addCard());
  addCardPopup.close();
  formAddSection.reset();
});
