import React from 'react';
import AuthWithForm from './AuthWithForm';
import { register } from '../utils/auth';
import { useHistory } from 'react-router-dom';

function Register() {
  const [inputEmail, setInputEmail] = React.useState({});
  const [inputPassword, setInputPassword] = React.useState({});
  const [popupMessage, setPopupMessage] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(true);
  const history = useHistory();

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
  function handleSubmit(evt) {
    evt.preventDefault();

    //меняем стейт кнопки на ожидание
    setIsSubmitting(false)
    
    // сюда добавим логику обработки формы регистрации
    register(inputEmail.value, inputPassword.value)
    .then(data => {
      //добавляем успешный месседж для попапа
      //setPopupMessage('Вы успешно зарегистрировались!')
      //console.log(popupMessage)
      
      //редиректим хуком на страницу логина
      history.push('/sign-in')
      
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
          <input className={`authentification__input authentification__input_email ${inputEmailErrorClass}`} value={inputEmail.value || ''} onChange={handleUserInput} type="email" name="email"  placeholder="Email" required minLength={6} maxLength={30} />
          <span className={`authentification__input-error authentification__input-error_type_email ${inputEmailErrorCaption}`}>
            {inputEmail.errorMessage}
          </span>
        </section>
        <section className="authentification__input-section">
          <input className={`authentification__input authentification__input_password ${inputPasswordErrorClass}`} value={inputPassword.value || ''} onChange={handleUserInput} type="password" name="password"  placeholder="Пароль" required minLength={6} />
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