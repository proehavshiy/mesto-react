import React from 'react';
import Popup from './Popup';

function PopupWithForm({ name, title, submitText, isOpen, onClose, onSubmit, submitButtonState, children }) {

  return(
    <Popup
      name={name}
      isOpen={isOpen}
      onClose={onClose}>
      <form className="popup__form" onSubmit={onSubmit} name={`${name}-form`}  noValidate autoComplete="off">
          <h2 className="popup__heading">
            {title}
          </h2>
          {children}
          <button className={`popup__button-save popup__button-save_${name} page__button ${!submitButtonState && 'popup__button-save_disabled'}`} disabled={!submitButtonState} type="submit" value="Отправить на сервер" aria-label="Кнопка Сохранить форму">
            {submitText}
          </button>
      </form>
      </Popup>
  )
}

export default PopupWithForm;
