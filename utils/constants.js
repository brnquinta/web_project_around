// ==================== Profile ====================
export const profileConfig = {
  profileNameSelector: ".profile__name",
  profileProfessionSelector: ".profile__profession",
};
export const editButton = document.querySelector(".profile__button-edit");
export const profileName = document.querySelector(".profile__name");
export const profileProfession = document.querySelector(".profile__profession");
export const editName = document.querySelector(".form .form__name");
export const editProfession = document.querySelector(".form .form__profession");
export const formSection = document.querySelector(".form .form__content");

// Cards iniciais
export const initialCards = [
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

// ==================== VALIDAÇÃO ====================
export const formValidationConfig = {
  formSelector: ".form__content",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__button-submit, .form-add__button-submit",
  inactiveButtonClass: "form__button-submit--invalid",
  inputErrorClass: "form__item--invalid",
  errorClass: "form__validation",
};

// ==================== Card ====================

export const cardsConfig = {
  containerSelector: ".gallery__content",
  cardSelector: "#card-template",
};
export const createButton = document.querySelector(".profile__button-add");
export const formPlaceInput = document.querySelector(".form-add .form__place");
export const formUrlInput = document.querySelector(".form-add .form__url");
export const formAddSection = document.querySelector(
  ".form-add .form__content"
);

// ==================== Footer ====================
export const footerCopy = document.querySelector(".footer__copy");
export const currentYear = new Date().getFullYear();
