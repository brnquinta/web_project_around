import { formValidationConfig } from "../utils/constants";

// FormValidation.js
export default class FormValidation {
  constructor(config) {
    this._config = config;
    this._forms = document.querySelectorAll(config.formSelector);

    this._forms.forEach((form) => this._setEventListeners(form));
  }

  // adiciona os listeners de cada form
  _setEventListeners(form) {
    const inputs = form.querySelectorAll(this._config.inputSelector);
    const buttonSubmit = form.querySelector(this._config.submitButtonSelector);

    if (buttonSubmit) {
      buttonSubmit.setAttribute("disabled", true);
      buttonSubmit.classList.add(this._config.inactiveButtonClass);
    }

    inputs.forEach((input) => {
      const spanError = form.querySelector(`.${input.classList[1]}-validation`);

      input.addEventListener("input", () => {
        this._validateInput(input, spanError);
        this._checkFormValidity(inputs, buttonSubmit);
      });
    });
  }

  // valida cada input individual
  _validateInput(input, spanError) {
    input.setCustomValidity("");

    if (!input.validity.valid) {
      if (input.classList.contains("form__name")) {
        input.setCustomValidity(
          "O campo Nome deve conter entre 2 e 40 caracteres."
        );
      }
      if (input.classList.contains("form__profession")) {
        input.setCustomValidity(
          "O campo Profissão deve conter entre 2 e 200 caracteres."
        );
      }
      if (input.classList.contains("form__place")) {
        input.setCustomValidity(
          "O campo Título deve conter entre 2 e 30 caracteres."
        );
      }
      if (input.classList.contains("form__url")) {
        input.setCustomValidity("O campo URL da imagem deve conter uma URL.");
      }

      input.classList.add(this._config.inputErrorClass);
      input.classList.remove("form__item--valid");
      if (spanError) spanError.textContent = input.validationMessage;
    } else {
      input.classList.remove(this._config.inputErrorClass);
      input.classList.add("form__item--valid");
      if (spanError) spanError.textContent = "";
    }
  }

  // valida o form inteiro e controla o botão
  _checkFormValidity(inputs, buttonSubmit) {
    const allValid = Array.from(inputs).every((input) => input.validity.valid);

    if (allValid) {
      buttonSubmit.removeAttribute("disabled");
      buttonSubmit.classList.remove(this._config.inactiveButtonClass);
    } else {
      buttonSubmit.setAttribute("disabled", true);
      buttonSubmit.classList.add(this._config.inactiveButtonClass);
    }
  }
}
