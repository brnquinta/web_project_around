import Card from "../components/Card.js";

import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {
  profileConfig,
  editButton,
  profileName,
  profileProfession,
  editName,
  editProfession,
  formSection,
  initialCards,
  cardsConfig,
  createButton,
  formPlaceInput,
  formUrlInput,
  formAddSection,
  footerCopy,
  currentYear,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import { formValidationConfig } from "../utils/constants.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

// ==================== VALIDAÇÃO ====================
const formValidator = new FormValidator(formValidationConfig);
formValidator.enableValidation();

// ==================== POPUPS ====================

// Instâncias separadas de popup
const profilePopup = new PopupWithForm(".form__overlay");
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(".form-add__overlay");
addCardPopup.setEventListeners();

const imagePopup = new PopupWithImage(".image-popup__overlay");
imagePopup.setEventListeners();

// ==================== PERFIL ====================

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

// Criação da Section para os cards
const cardList = new Section(
  { items: initialCards },
  cardsConfig.containerSelector
);

// Renderer dos cards
cardList.setRenderer((cardData) => {
  const card = new Card(cardData.name, cardData.link, (name, link) => {
    imagePopup.open({ name, link });
  });
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
// Atualiza o ano do footer
footerCopy.innerHTML = `&copy;${currentYear} Around The U.S.`;
