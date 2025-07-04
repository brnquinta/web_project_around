const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  const like_button = card.querySelector(".card__button");
  const like_icon = card.querySelector(".card__icon");

  like_button.addEventListener("click", () => {
    console.log("clicado");
    if (like_icon.getAttribute("src").includes("heart_icon.png")) {
      like_icon.setAttribute("src", "images/heart_icon_black.png");
    } else {
      like_icon.setAttribute("src", "images/heart_icon.png");
    }
  });
});

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
