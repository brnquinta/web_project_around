import { enableValidation } from "./validate.js";
import Card from "./card.js";

const editButton = document.querySelector(".profile__button-edit");
const formSection = document.querySelector(".form");
const formOverlay = document.querySelector(".form__overlay");
const formCloseButton = formSection.querySelector(".form__close-button");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const editName = formSection.querySelector(".form__name");
const editProfession = formSection.querySelector(".form__profession");
const buttonSubmit = formSection.querySelector(".form__button-submit");

// Toggle edição perfil
editButton.addEventListener("click", () => {
  formOverlay.classList.toggle("visible");
  editName.setAttribute("placeholder", profileName.textContent);
  editProfession.setAttribute("placeholder", profileProfession.textContent);
});

formCloseButton.addEventListener("click", closeUpForm);

// Submissão edição perfil
buttonSubmit.addEventListener("click", () => {
  const name = editName.value;
  const profession = editProfession.value;

  if (name && profession !== "") {
    profileName.textContent = name;
    profileProfession.textContent = profession;
    closeUpForm();
  }
});

// Fechar formulário popup
function closeUpForm() {
  const forms = document.querySelectorAll(".form, .form-add");
  forms.forEach((form) => {
    const overlays = form.querySelectorAll(".form__overlay");
    overlays.forEach((overlay) => {
      overlay.classList.remove("visible");
    });
  });
}

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
});

// Inputs para fechar formulário
formAddCloseButton.addEventListener("click", closeUpForm);

formOverlay.addEventListener("click", (event) => {
  if (event.target.classList.contains("form__overlay")) {
    closeUpForm();
  }
});

formAddOverlay.addEventListener("click", (event) => {
  if (event.target.classList.contains("form__overlay")) {
    closeUpForm();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeUpForm();
  }
});

// abrir formulário de add cartão
const formCreateButton = formAddSection.querySelector(
  ".form-add__button-submit"
);
const formPlaceInput = formAddSection.querySelector(".form__place");
const formUrlInput = formAddSection.querySelector(".form__url");
const galleryContainer = document.querySelector(".gallery__content");

// ==================== CRIAÇÃO DE CARDS ====================

// MUDANÇA: removi o trecho errado que criava card direto fora de evento
// Agora a criação é feita apenas no clique do botão + inicialização

formCreateButton.addEventListener("click", () => {
  const card = new Card(formPlaceInput.value, formUrlInput.value); // MUDANÇA: agora passa os valores corretos
  const cardElement = card.addCard(); // MUDANÇA: método addCard() deve retornar o elemento no Card.js
  galleryContainer.prepend(cardElement);
  closeUpForm();

  // Popup de imagem
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
});

// MUDANÇA: corrigido para usar a classe Card no carregamento inicial
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
  const cardElement = card.addCard();
  galleryContainer.prepend(cardElement);
});

// ==================== POPUP DE IMAGEM ====================
const imagePopUp = document.querySelector(".image-popup");
const imageCloseButton = document.querySelector(".image-popup__close-button");
const imagePopUpOverlay = document.querySelector(".image-popup__overlay");
const imagePopUpPhoto = document.querySelector(".image-popup__photo");

function closeCardPopUp() {
  imagePopUpOverlay.classList.remove("visible");
}

imageCloseButton.addEventListener("click", closeCardPopUp);
imagePopUpOverlay.addEventListener("click", closeCardPopUp);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCardPopUp();
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
