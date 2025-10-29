import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  setSubmitionAction(action) {
    this._handleSubmitCallback = action;
  }
  setEventListeners() {
    const submitForm = this.popup.querySelector(".form__content");

    submitForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
    super.setEventListeners();
  }
}

export default PopupWithConfirmation;
