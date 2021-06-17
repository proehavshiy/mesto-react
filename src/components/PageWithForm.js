import React from 'react';
import { Link } from 'react-router-dom';

function PageWithForm({ name, title, submitText, onSubmit, submitButtonState, isRegister, theme, children }) {

  return (
    <div className='page-with-form page__block-alignment page__animation'>
      <div className={`page-with-form__container page-with-form__container_${name}`}>
        <form className={`form form_theme_${theme}`} onSubmit={onSubmit} name={`${name}-form`} noValidate autoComplete="off">
          <h2 className="form__heading">
            {title}
          </h2>
          {children}
          <button className={`page__button form__button-save form__button-save_theme_${theme}`} disabled={!submitButtonState} type="submit" value="Отправить на сервер" aria-label="Кнопка Сохранить форму">
            {submitText}
          </button>
          {isRegister && (
            <p className='form__redirection'>Уже зарегистрированы?
              <Link to="/sign-in" className="form__link page__button">Войти</Link>
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default PageWithForm;


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

        <a className='page-with-form__link page__button' href='/sign-in'>Войти</a>
*/
