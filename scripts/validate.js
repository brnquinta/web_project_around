// validate.js
export function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => {
    const inputs = form.querySelectorAll(config.inputSelector);
    const buttonSubmit = form.querySelector(config.submitButtonSelector);

    if (buttonSubmit) {
      buttonSubmit.setAttribute("disabled", true);
    }

    function checkFormValidity() {
      const allValid = Array.from(inputs).every(
        (input) => input.validity.valid
      );
      if (allValid) {
        buttonSubmit.removeAttribute("disabled");
        buttonSubmit.classList.remove(config.inactiveButtonClass);
      } else {
        buttonSubmit.setAttribute("disabled", true);
        buttonSubmit.classList.add(config.inactiveButtonClass);
      }
    }

    inputs.forEach((input) => {
      const spanError = form.querySelector(`.${input.classList[1]}-validation`);

      input.addEventListener("input", () => {
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
            input.setCustomValidity(
              "O campo URL da imagem deve conter uma URL."
            );
          }

          input.classList.add(config.inputErrorClass);
          input.classList.remove("form__item--valid");
          if (spanError) spanError.textContent = input.validationMessage;
        } else {
          input.classList.remove(config.inputErrorClass);
          input.classList.add("form__item--valid");
          if (spanError) spanError.textContent = "";
        }

        checkFormValidity();
      });
    });
  });
}
