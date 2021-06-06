import React from 'react';
import AuthWithForm from './AuthWithForm';

function Register({ onRegister, isSubmitting }) {
  const [input, setInput] = React.useState({});

  const submitButtonState = !input.email || !input.password || !input.email.valid || !input.password.valid ? false : true;
  const submitButtonText = isSubmitting ? 'Зарегистрироваться' : 'Регистрация...';

  const inputEmailErrorClass = !input.email || input.email.errorMessage ? 'authentification__input_error' : '';
  const inputEmailErrorCaption = !input.email || input.email.errorMessage ? 'authentification__input-error_active' : '';
  const emailErrorMessage = input.email && input.email.errorMessage;

  const inputPasswordErrorClass = !input.password || input.password.errorMessage ? 'authentification__input_error'  : '';
  const inputPasswordErrorCaption = !input.password || input.password.errorMessage ? 'authentification__input-error_active'  : '';
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

    onRegister(input.email.value, input.password.value)

  }

  //React.useEffect(() => {
  //  //сбрасываем поля после отправки формы
  //  //if нужен для того, чтобы в момент ожидания ответа от сервера
  //  //кнопка не дизейблилась, и данные инпутов не очищались. так некрасиво
  //  if(isSubmitting === true) {
  //    setInputText({});
  //    setInputLink({});
  //  }
  //}, [isSubmitting]);

  return(
    <AuthWithForm
      name="register"
      title="Регистрация"
      submitText={submitButtonText}
      onSubmit={handleSubmit}
      submitButtonState={submitButtonState}
      isRegister={true}>
      <fieldset className="authentification__profile-information">
        <section className="authentification__input-section">
          <input className={`authentification__input authentification__input_email ${inputEmailErrorClass}`} value={input.email ? input.email.value : ''} onChange={handleUserInput} type="email" name="email"  placeholder="Email" required minLength={6} maxLength={30} />
          <span className={`authentification__input-error authentification__input-error_type_email ${inputEmailErrorCaption}`}>
            {emailErrorMessage}
          </span>
        </section>
        <section className="authentification__input-section">
          <input className={`authentification__input authentification__input_password ${inputPasswordErrorClass}`} value={input.password ? input.password.value : ''} onChange={handleUserInput} type="password" name="password"  placeholder="Пароль" required minLength={6} />
          <span className={`authentification__input-error authentification__input-error_type_password ${inputPasswordErrorCaption}`}>
          {passwordErrorMessage}
          </span>
        </section>
      </fieldset>
    </AuthWithForm>
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