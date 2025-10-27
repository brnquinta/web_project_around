import Api from "../components/Api.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
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
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import { formValidationConfig } from "../utils/constants.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

// ==================== CONEXÃO COM A API ====================
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "58b0b10b-b6fe-4366-95fc-c7e6d47a6646",
    "Content-Type": "application/json",
  },
});

// ==================== VALIDAÇÃO ====================
const formValidator = new FormValidator(formValidationConfig);
formValidator.enableValidation();

// ==================== PERFIL ====================
const userInfo = new UserInfo(
  document.querySelector(profileConfig.profileNameSelector),
  document.querySelector(profileConfig.profileProfessionSelector)
);

// ==================== POPUPS ====================

// Popup de perfil
const profilePopup = new PopupWithForm(".form__overlay", (formValues) => {
  const name = formValues.name;
  const about = formValues.about;

  api
    .editProfileinfo(name, about)
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about);
      profilePopup.close();
    })
    .catch((err) => {
      console.error("Erro ao atualizar perfil:", err);
    });
});
profilePopup.setEventListeners();

// Popup de adicionar card
const addCardPopup = new PopupWithForm(".form-add__overlay", (formValues) => {
  const name = formValues.place;
  const link = formValues.url;

  api
    .createCard({ name, link })
    .then((cardData) => {
      const card = createCardInstance(cardData);
      cardList.addItem(card.addCard());
      addCardPopup.close();
    })
    .catch((err) => {
      console.error("Erro ao criar card:", err);
    });
});
addCardPopup.setEventListeners();

// Popup alterar avatar

const avatarFormPopup = new PopupWithForm(
  ".form-avatar__overlay",
  (formValues) => {
    const link = formValues.url;
    console.log("Novo link:", link);

    api.editProfileAvatar(link).then((data) => {
      profileAvatar.setAttribute("src", data.avatar);
    });
  }
);

avatarFormPopup.setEventListeners();

profileAvatar.addEventListener("click", () => {
  avatarFormPopup.open();
});

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

// Criação da Section para os cards
const cardList = new Section({ items: [] }, cardsConfig.containerSelector);

// Função utilitária para criar uma instância de Card com todos os handlers
function createCardInstance(cardData) {
  return new Card(
    cardData,
    (name, link) => imagePopup.open({ name, link }),
    (cardInstance) => {
      const currentlyLiked = cardInstance._isLiked;
      api
        .toggleLike(cardInstance._id, currentlyLiked)
        .then((updatedCard) => {
          cardInstance.updateLikeState(updatedCard.isLiked);
        })
        .catch((err) => console.error("Erro ao alternar curtida:", err));
    },
    (cardInstance) => {
      api
        .removeCard(cardInstance._id)
        .then(() => {
          cardInstance.deleteCard();
        })
        .catch((err) => console.error("Erro ao deletar o cartão:", err));
    }
  );
}

// Busca os dados iniciais da API
api
  .getAppInfo()
  .then(([cards, userData]) => {
    profileAvatar.setAttribute("src", userData.avatar);
    userInfo.setUserInfo(userData.name, userData.about);
    cardList.setRenderer((cardData) => {
      const card = createCardInstance(cardData);
      cardList.addItem(card.addCard());
    });
    cardList.renderItems([...cards].reverse());
  })
  .catch((err) => console.error("Erro ao carregar dados iniciais:", err));

// ==================== EVENTOS DE CARDS ====================
createButton.addEventListener("click", () => addCardPopup.open());

// ==================== FOOTER ====================
footerCopy.innerHTML = `&copy;${currentYear} Around The U.S.`;
