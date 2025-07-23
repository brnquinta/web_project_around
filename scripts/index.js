const cards = document.querySelectorAll(".card");

// botão de edição
const edit_button = document.querySelector(".profile__button-edit");

// janela de formulário
const form_section = document.querySelector(".form");
const form_overlay = form_section.querySelector(".form__overlay");
const form_window = form_overlay.querySelector(".form__content");
const form_close_button = form_section.querySelector(".form__close-button");

// perfil cadastrado
const profile_name = document.querySelector(".profile__name");
const profile_profession = document.querySelector(".profile__profession");

// inputs do formulário
const form_item = document.querySelector(".form__item");
const edit_name = form_section.querySelector(".form__name");
const edit_profession = form_section.querySelector(".form__profession");

//botão submit formulário
const button_submit = form_section.querySelector(".form__button-submit");

// função toggle do formulário

edit_button.addEventListener("click", () => {
  form_overlay.classList.toggle("visible");
  form_window.classList.toggle("visible");
});

form_close_button.addEventListener("click", () => {
  form_overlay.classList.remove("visible");
  form_window.classList.remove("visible");
});

console.log(edit_name);

// Botão subimt do formulário

button_submit.addEventListener("click", () => {
  let name = edit_name.value;
  let profession = edit_profession.value;

  if (name && profession !== "") {
    profile_name.textContent = name;
    profile_profession.textContent = profession;
    form_overlay.classList.remove("visible");
    form_window.classList.remove("visible");
  } else {
    alert("Preencha todos os campos!");
  }
});

// botão formulário criar cartão
const formAddSection = document.querySelector(".form-add");
const createButton = document.querySelector(".profile__button-add");
const formAddOverlay = document.querySelector(".form-add__overlay");
const formAddWindow = formAddOverlay.querySelector(".form-add__content");
const formAddCloseButton = formAddSection.querySelector(
  ".form-add__close-button"
);

// Abrir formulário de criar cartão
createButton.addEventListener("click", () => {
  formAddOverlay.classList.toggle("visible");
  formAddWindow.classList.toggle("visible");
});

// fechar formulário de criar cartão
formAddCloseButton.addEventListener("click", () => {
  formAddOverlay.classList.remove("visible");
  formAddWindow.classList.remove("visible");
});

// adicionar card através do formulário
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
  galleryContainer.prepend(cardElement);

  // Adicionar funcionalidade ao botão de deletar do card específico
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  // Adicionar funcionalidade ao botão de like do card específico
  const likeButton = cardElement.querySelector(".card__button");
  const likeIcon = cardElement.querySelector(".card__icon");

  likeButton.addEventListener("click", () => {
    console.log("clicado");

    if (likeIcon.getAttribute("src").includes("heart_icon.png")) {
      likeIcon.setAttribute("src", "images/heart_icon_black.png");
    } else {
      likeIcon.setAttribute("src", "images/heart_icon.png");
    }
  });
  // Adicionar funcionalidade de popup do card específico
  const cardPhoto = cardElement.querySelector(".card__photo");
  const imagePopUpOverlay = document.querySelector(".image-popup__overlay");
  const imagePopUpPhoto = document.querySelector(".image-popup__photo");
  const imagePopUpName = document.querySelector(".image-popup__name");
  const cardName = cardElement.querySelector(".card__name").textContent;

  cardPhoto.addEventListener("click", () => {
    imagePopUpOverlay.classList.toggle("visible");
    imagePopUpPhoto.classList.toggle("visible");
    imagePopUpPhoto.setAttribute("src", cardPhoto.getAttribute("src"));
    imagePopUpName.textContent = cardName;
    imagePopUpName.classList.toggle("visible");
  });
}

formCreateButton.addEventListener("click", () => {
  addCard(formPlaceInput.value, formUrlInput.value);
});

// Render cartões iniciais
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
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

initialCards.forEach((card) => {
  addCard(card.name, card.link);
});
// fechar popup de imagem

const imageCloseButton = document.querySelector(".image-popup__close-button");
const imagePopUpOverlay = document.querySelector(".image-popup__overlay");
const imagePopUpPhoto = document.querySelector(".image-popup__photo");

imageCloseButton.addEventListener("click", () => {
  imagePopUpOverlay.classList.remove("visible");
  imagePopUpPhoto.classList.remove("visible");
});
