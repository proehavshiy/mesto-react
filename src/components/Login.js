import React from 'react';
import PopupWithForm from './AuthWithForm';

function Login({ isSubmitting }) {
  const [inputEmail, setInputEmail] = React.useState({});
  const [inputPassword, setInputPassword] = React.useState({});

  const submitButtonState = !inputEmail.value || !inputPassword.value || !inputEmail.valid || !inputPassword.valid ? false : true;
  const submitButtonText = isSubmitting ? 'Войти' : 'Вход...';

  const inputEmailErrorClass = inputEmail.errorMessage ? 'popup__input_error' : '';
  const inputEmailErrorCaption = inputEmail.errorMessage ? 'popup__input-error_active' : '';

  const inputPasswordErrorClass = inputPassword.errorMessage ? 'popup__input_error'  : '';
  const inputPasswordErrorCaption = inputPassword.errorMessage ? 'popup__input-error_active'  : '';

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
  function handleLoginSubmit(evt) {
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
    <PopupWithForm
      name="login"
      title="Вход"
      submitText={submitButtonText}
      onSubmit={handleLoginSubmit}
      submitButtonState={submitButtonState}>
      <fieldset className="popup__profile-information">
        <section className="popup__input-section">
          <input className={`popup__input popup__input_email ${inputEmailErrorClass}`} value={inputEmail.value || ''} onChange={handleUserInput} type="email" name="email"  placeholder="Email" required minLength={2} maxLength={30} />
          <span className={`popup__input-error popup__input-error_type_email ${inputEmailErrorCaption}`}>
            {inputEmail.errorMessage}
          </span>
        </section>
        <section className="popup__input-section">
          <input className={`popup__input popup__input_password ${inputPasswordErrorClass}`} value={inputPassword.value || ''} onChange={handleUserInput} type="password" name="password"  placeholder="Пароль" required />
          <span className={`popup__input-error popup__input-error_type_password ${inputPasswordErrorCaption}`}>
          {inputPassword.errorMessage}
          </span>
        </section>
      </fieldset>
      </PopupWithForm>
  )
}

export default Login;

  

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