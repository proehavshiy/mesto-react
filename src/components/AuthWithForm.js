import React from 'react';
import { Link } from 'react-router-dom';

function AuthWithForm({name, title, submitText, onSubmit, submitButtonState, isRegister, children}) {


  return(
    <div className='authentification page__block-alignment page__animation'>
     <div className={`authentification__container authentification__container_${name}`}>
       <form className="authentification__form" onSubmit={onSubmit} name={`${name}-form`}  noValidate autoComplete="off">
         <h2 className="authentification__heading">
           {title}
         </h2>
        {children}
         <button className={`authentification__button-save authentification__button-save_${name} page__button ${!submitButtonState && 'authentification__button-save_disabled'}`} disabled={!submitButtonState} type="submit" value="Отправить на сервер" aria-label="Кнопка Сохранить форму">
           {submitText}
         </button>
         {isRegister && (
           <p className='authentification__redirection'>Уже зарегистрированы? 
           <Link to="/sign-in" className="authentification__link page__button">Войти</Link>
          </p>
         )}
       </form>
     </div>
    </div>
  )
}

export default AuthWithForm;


/*
  function handleClickClose(evt) {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close') || (evt.target.classList.contains('popup__button-save'))) {
      onClose()
    }
  }

  import { Link, withRouter } from 'react-router-dom';

  <div className="login__signup">
          <p>Ещё не зарегистрированы?</p>
          <Link to="/register" className="signup__link">Зарегистрироваться</Link>
        </div>

        <a className='authentification__link page__button' href='/sign-in'>Войти</a>
*/
