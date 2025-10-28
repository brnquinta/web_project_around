import Api from "../components/Api.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import {
  profileConfig,
  editButton,
  editName,
  editProfession,
  profileAvatar,
  cardsConfig,
  createButton,
  footerCopy,
  currentYear,
  formValidationConfig,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const deleteCardPopup = new PopupWithConfirmation(".confirm-popup__overlay");

// ==================== API ====================
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "58b0b10b-b6fe-4366-95fc-c7e6d47a6646",
    "Content-Type": "application/json",
  },
});

// ==================== VALIDAÇÃO ====================
new FormValidator(formValidationConfig).enableValidation();

// ==================== PERFIL ====================
const userInfo = new UserInfo(
  document.querySelector(profileConfig.profileNameSelector),
  document.querySelector(profileConfig.profileProfessionSelector)
);

// ==================== POPUPS ====================

// 🟢 Confirm Popup corrigido para usar setSubmitAction
const confirmPopup = new PopupWithForm(".confirm-popup__overlay", () => {});
confirmPopup.setEventListeners();

// 🟢 Função limpa e profissional para abrir popup de confirmação
function openConfirmPopup(action) {
  confirmPopup.setSubmitAction(() => {
    action();
    confirmPopup.close();
  });
  confirmPopup.open();
}

// Popup de perfil
const profilePopup = new PopupWithForm(".form__overlay", (formValues) => {
  api
    .editProfileinfo(formValues.name, formValues.about)
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about);
      profilePopup.close();
    })
    .catch(console.error);
});
profilePopup.setEventListeners();

// Popup de adicionar card
const addCardPopup = new PopupWithForm(".form-add__overlay", (formValues) => {
  api
    .createCard({ name: formValues.place, link: formValues.url })
    .then((cardData) => {
      cardList.addItem(createCardInstance(cardData).addCard());
      addCardPopup.close();
    })
    .catch(console.error);
});
addCardPopup.setEventListeners();

// Popup alterar avatar
const avatarFormPopup = new PopupWithForm(
  ".form-avatar__overlay",
  (formValues) => {
    api
      .editProfileAvatar(formValues.url)
      .then((data) => (profileAvatar.src = data.avatar))
      .catch(console.error);
  }
);
avatarFormPopup.setEventListeners();

profileAvatar.addEventListener("click", () => avatarFormPopup.open());

// Popup de imagem
const imagePopup = new PopupWithImage(".image-popup__overlay");
imagePopup.setEventListeners();

// ==================== EVENTOS DE PERFIL ====================
editButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  editName.value = userData.userName;
  editProfession.value = userData.userProfession;
  profilePopup.open();
});

// ==================== CARDS ====================
const cardList = new Section({ items: [] }, cardsConfig.containerSelector);

function createCardInstance(cardData) {
  return new Card(
    cardData,
    (name, link) => imagePopup.open({ name, link }),
    (cardInstance) => {
      api
        .toggleLike(cardInstance._id, cardInstance._isLiked)
        .then((updatedCard) =>
          cardInstance.updateLikeState(updatedCard.isLiked)
        )
        .catch(console.error);
    },
    // 🟢 Aqui o confirmPopup é usado corretamente
    (cardInstance) => {
      deleteCardPopup.open();
      deleteCardPopup.setSubmitionAction(() => {
        api
          .removeCard(cardInstance._id)
          .then(() => {
            cardInstance.deleteCard();
            deleteCardPopup.close();
          })
          .catch(console.error);
      });
    }
  );
}

// ==================== API INITIAL LOAD ====================
api
  .getAppInfo()
  .then(([cards, userData]) => {
    profileAvatar.src = userData.avatar;
    userInfo.setUserInfo(userData.name, userData.about);

    cardList.setRenderer((cardData) =>
      cardList.addItem(createCardInstance(cardData).addCard())
    );
    cardList.renderItems([...cards].reverse());
  })
  .catch(console.error);

// ==================== EVENTOS DE CARDS ====================
createButton.addEventListener("click", () => addCardPopup.open());

// ==================== FOOTER ====================
footerCopy.innerHTML = `&copy;${currentYear} Around The U.S.`;

deleteCardPopup.setEventListeners();
