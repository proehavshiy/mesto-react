import React from 'react';
import AuthWithForm from './AuthWithForm';

function Register({ isSubmitting }) {
  const [inputEmail, setInputEmail] = React.useState({});
  const [inputPassword, setInputPassword] = React.useState({});

  const submitButtonState = !inputEmail.value || !inputPassword.value || !inputEmail.valid || !inputPassword.valid ? false : true;
  const submitButtonText = isSubmitting ? 'Зарегистрироваться' : 'Регистрация...';

  const inputEmailErrorClass = inputEmail.errorMessage ? 'authentification__input_error' : '';
  const inputEmailErrorCaption = inputEmail.errorMessage ? 'authentification__input-error_active' : '';

  const inputPasswordErrorClass = inputPassword.errorMessage ? 'authentification__input_error'  : '';
  const inputPasswordErrorCaption = inputPassword.errorMessage ? 'authentification__input-error_active'  : '';

  //обработчик инпутов
  function handleUserInput({ target }) {
    const { name, value, validity: { valid }, validationMessage } = target;

    if (name === "email") {
      setInputEmail({
        value,
        valid,
        errorMessage: validationMessage
      })
    }
    if (name === "password") {
      setInputPassword({
        value,
        valid,
        errorMessage: validationMessage
      })
    }
  }

  //обработчик формы
  function handleRegisterSubmit(evt) {
    evt.preventDefault();

    console.log(evt)

    //onAddPlace({
    //  name: inputText.value,
    //  link: inputLink.value
    //})
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
      onSubmit={handleRegisterSubmit}
      submitButtonState={submitButtonState}>
      <fieldset className="authentification__profile-information">
        <section className="authentification__input-section">
          <input className={`authentification__input authentification__input_email ${inputEmailErrorClass}`} value={inputEmail.value || ''} onChange={handleUserInput} type="email" name="email"  placeholder="Email" required minLength={2} maxLength={30} />
          <span className={`authentification__input-error authentification__input-error_type_email ${inputEmailErrorCaption}`}>
            {inputEmail.errorMessage}
          </span>
        </section>
        <section className="authentification__input-section">
          <input className={`authentification__input authentification__input_password ${inputPasswordErrorClass}`} value={inputPassword.value || ''} onChange={handleUserInput} type="password" name="password"  placeholder="Пароль" required />
          <span className={`authentification__input-error authentification__input-error_type_password ${inputPasswordErrorCaption}`}>
          {inputPassword.errorMessage}
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