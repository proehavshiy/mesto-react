import React from 'react';
import AuthWithForm from './AuthWithForm';
import { login } from '../utils/auth';
import { useHistory } from 'react-router-dom';

function Login({ setIsLoggedIn, setEmail }) {
  const [inputEmail, setInputEmail] = React.useState({});
  const [inputPassword, setInputPassword] = React.useState({});
  const [popupMessage, setPopupMessage] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(true);
  const history = useHistory();

  const submitButtonState = !inputEmail.value || !inputPassword.value || !inputEmail.valid || !inputPassword.valid ? false : true;
  const submitButtonText = isSubmitting ? 'Войти' : 'Вход...';

  const inputEmailErrorClass = inputEmail.errorMessage ? 'authentification__input_error' : '';
  const inputEmailErrorCaption = inputEmail.errorMessage ? 'authentification__input-error_active' : '';

  const inputPasswordErrorClass = inputPassword.errorMessage ? 'authentification__input_error'  : '';
  const inputPasswordErrorCaption = inputPassword.errorMessage ? 'authentification__input-error_active'  : '';

  //обработчик инпутов
  function handleLoginInput({ target }) {
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
  function handleSubmit(evt) {
    evt.preventDefault();
    //меняем стейт кнопки на ожидание
    setIsSubmitting(false)

    if (!inputEmail || !inputPassword) {
      return
    }

    login(inputEmail.value, inputPassword.value)
    .then(data => {
      if(!data) {
        //setPopupMessage('Что-то пошло не так! Попробуйте ещё раз.')
      }

      if(data.token) {
        //вход успешен
        setIsLoggedIn(true);
        //сохраняем токен пользователя в localStorage
        localStorage.setItem('jwt', data.token)
        //запишем емейл для подстановки в шапку, потому что он не подставляется в шапку при входе через логин
        setEmail(inputEmail.value)
        //перенаправляем на главную
        history.push('/')
        //меняем стейт кнопки // можно и без изменения/ все работает/ хз почему
        //setIsSubmitting(true)
      }
    })
    .catch(err => {
      console.log(err)
      //setPopupMessage('Что-то пошло не так! Попробуйте ещё раз.')
      //console.log(popupMessage)
    })
  }
  

  //React.useEffect(() => {
  //  //сбрасываем поля после отправки формы
  //  //if нужен для того, чтобы в момент ожидания ответа от сервера
  //  //кнопка не дизейблилась, и данные инпутов не очищались. так некрасиво
  //  if(isSubmitting === false) {
  //    //очищаем стейты для экономии памяти
  //    setInputEmail({});
  //    setInputPassword({});
  //    console.log('inputEmail', inputEmail)
  //    console.log('inputPassword', inputPassword)
  //    console.log('isSubmitting', isSubmitting)
  //    
  //    console.log(1)
  //  }
  //}, [isSubmitting]);

  return(
    <AuthWithForm
      name="login"
      title="Вход"
      submitText={submitButtonText}
      onSubmit={handleSubmit}
      submitButtonState={submitButtonState}
      isRegister={false}>
      <fieldset className="authentification__profile-information">
        <section className="authentification__input-section">
          <input className={`authentification__input authentification__input_email ${inputEmailErrorClass}`} value={inputEmail.value || ''} onChange={handleLoginInput} type="email" name="email"  placeholder="Email" required minLength={6} maxLength={30} />
          <span className={`authentification__input-error authentification__input-error_type_email ${inputEmailErrorCaption}`}>
            {inputEmail.errorMessage}
          </span>
        </section>
        <section className="authentification__input-section">
          <input className={`authentification__input authentification__input_password ${inputPasswordErrorClass}`} value={inputPassword.value || ''} onChange={handleLoginInput} type="password" name="password"  placeholder="Пароль" required minLength={6} />
          <span className={`authentification__input-error authentification__input-error_type_password ${inputPasswordErrorCaption}`}>
          {inputPassword.errorMessage}
          </span>
        </section>
      </fieldset>
      </AuthWithForm>
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