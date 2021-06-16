import React from 'react';

function Popup({ name, isOpen, onClose, children }) {
  const togglePopupState = isOpen ? 'popup__flexed popup_opened' : 'popup__flexed';

  //закрытие по крестику, по клику вне формы
  function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      onClose()
    }
  }
  function handleButtonClose(evt) {
    if (evt.target === evt.currentTarget) {
      onClose()
    }
  }

  //закрытие по Esc попапов
  React.useEffect(() => {
    if (!isOpen) return;

    const handleEscapeClose = (evt) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keyup', handleEscapeClose);
    return () => {
      document.removeEventListener('keyup', handleEscapeClose);
    }
  }, [isOpen, onClose]);


  return (
    <div className={`popup popup_${name} ${togglePopupState}`} onClick={handleOverlayClose}>
      <div className={`popup__container popup__container_form popup__container_${name}`}>
        <button className={`page__button page__button_type_close popup__button-close popup__button-close_${name}`} onClick={handleButtonClose} aria-label="Кнопка Закрыть форму" type="button" />
        {children}
      </div>
    </div>
  )
}

export default Popup;


/*
  function handleClickClose(evt) {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close') || (evt.target.classList.contains('popup__button-save'))) {
      onClose()
    }
  }

  <form className="popup__form" onSubmit={onSubmit} name={`${name}-form`}  noValidate autoComplete="off">
         <h2 className="popup__heading">
           {title}
         </h2>
        {children}
         <button className={`popup__button-save popup__button-save_${name} page__button ${!submitButtonState && 'popup__button-save_disabled'}`} disabled={!submitButtonState} type="submit" value="Отправить на сервер" aria-label="Кнопка Сохранить форму">
           {submitText}
         </button>
       </form>
*/
