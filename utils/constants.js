// ==================== Profile ====================
export const profileConfig = {
  profileNameSelector: ".profile__name",
  profileProfessionSelector: ".profile__profession",
};

export default class Overlay {
  constructor(selector) {
    this.overlays = document.querySelectorAll(selector);
  }

  // Abre o overlay
  open(index = 0) {
    if (this.overlays[index]) {
      this.overlays[index].classList.add("overlay--active");
    }
  }

  // Fecha o overlay
  close(index = 0) {
    if (this.overlays[index]) {
      this.overlays[index].classList.remove("overlay--active");
    }
  }
}

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
