const cards = document.querySelectorAll(".gallery__card");

cards.forEach((card) => {
  const like_button = card.querySelector(".card__button");
  const like_icon = card.querySelector(".card__icon");

  like_button.addEventListener("click", () => {
    if (like_icon.getAttribute("src").includes("heart_icon.png")) {
      like_icon.setAttribute("src", "images/heart_icon_black.png");
    } else {
      like_icon.setAttribute("src", "images/heart_icon.png");
    }
  });
});
const form__window = document.querySelector(".form__content");
const edit_button = document.querySelector(".profile__button-edit");
let profile__name = document.querySelector(".profile__name");
let profile__profession = document.querySelector(".profile__profession");
const form = document.querySelector(".form__item");
let edit_name = form.querySelector(".form__name");
let edit_profession = form.querySelector(".form__profession");

edit_button.addEventListener("click", () => {
  form__window.classList.toggle("visible");
});
