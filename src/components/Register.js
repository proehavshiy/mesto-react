import React from 'react';
import PageWithForm from './PageWithForm';

function Register({ onRegister, isSubmitting }) {
  const [input, setInput] = React.useState({});

  const theme = 'dark';

  const submitButtonState = !input.email || !input.password || !input.email.valid || !input.password.valid ? false : true;
  const submitButtonText = isSubmitting ? 'Зарегистрироваться' : 'Регистрация...';

  const inputEmailErrorClass = !input.email || input.email.errorMessage ? 'form__input_error' : '';
  const inputEmailErrorCaption = !input.email || input.email.errorMessage ? 'form__input-error_active' : '';
  const emailErrorMessage = input.email && input.email.errorMessage;

  const inputPasswordErrorClass = !input.password || input.password.errorMessage ? 'form__input_error' : '';
  const inputPasswordErrorCaption = !input.password || input.password.errorMessage ? 'form__input-error_active' : '';
  const passwordErrorMessage = input.password && input.password.errorMessage;

  //обработчик инпутов
  function handleUserInput({ target }) {
    const { name, value, validity: { valid }, validationMessage } = target;

    setInput(prevState => ({
      ...prevState,
      [name]: {
        value,
        valid,
        errorMessage: validationMessage
      }
    })
    )
  }

  //обработчик формы
  function handleSubmit(evt) {
    evt.preventDefault();

    if (!input.email.value || !input.password.value) {
      return
    }

    onRegister(input.email.value, input.password.value)

  }

  return (
    <PageWithForm
      name="register"
      title="Регистрация"
      submitText={submitButtonText}
      onSubmit={handleSubmit}
      submitButtonState={submitButtonState}
      isRegister={true}
      theme={theme}>
      <fieldset className="form__profile-information">
        <section className="form__input-section">
          <input className={`form__input form__input_theme_${theme} ${inputEmailErrorClass}`} value={input.email ? input.email.value : ''} onChange={handleUserInput} type="email" name="email" placeholder="Email" required minLength={6} maxLength={30} />
          <span className={`form__input-error ${inputEmailErrorCaption}`}>
            {emailErrorMessage}
          </span>
        </section>
        <section className="form__input-section">
          <input className={`form__input form__input_theme_${theme} ${inputPasswordErrorClass}`} value={input.password ? input.password.value : ''} onChange={handleUserInput} type="password" name="password" placeholder="Пароль" required minLength={6} />
          <span className={`form__input-error ${inputPasswordErrorCaption}`}>
            {passwordErrorMessage}
          </span>
        </section>
      </fieldset>
    </PageWithForm>
  )
}

export default Register;



/*
<PopupWithForm
        name="add-card"
        title="Новое место"
        submitText={submitButtonText}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleAddPlaceSubmit}
        submitButtonState={submitButtonState}>

        </PopupWithForm>
*/
