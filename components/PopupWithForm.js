import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._form = this.popup.querySelector("form");
    this._handleFormSubmit = handleFormSubmit;
  }

  setLoadingState(isLoading) {
    if (!this._form) return;

    const submitButton = this._form.querySelector('button[type="submit"]');
    if (!submitButton) return;

    if (isLoading) {
      submitButton.textContent = "Salvando...";
      submitButton.disabled = true;
    } else {
      submitButton.textContent = this._submitButtonText;
      submitButton.disabled = false;
    }
  }

  setSubmitAction(newAction) {
    this._handleFormSubmit = newAction;
  }

  _getInputValues() {
    const inputs = this._form.querySelectorAll("input");
    const formValues = {};
    inputs.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
