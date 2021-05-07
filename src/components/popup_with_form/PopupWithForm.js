import React from 'react';

function PopupWithForm({name, title, submitText, isOpen, onClose, children}) {
  const togglePopupState = isOpen ? 'popup__flexed popup_opened' : 'popup__flexed';

  //закрытие по крестику и по клику вне формы
  function handleClickClose(evt) {
    (evt.target.classList.contains('popup_opened') ||
    evt.target.classList.contains('popup__button-close')) && (onClose());
  }
  //закрытие по Esc попапов
  React.useEffect(()=> {
    if (!isOpen) return;

    const handleEscapeClose = (evt) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keyup',handleEscapeClose);
    return () => {
      document.removeEventListener('keyup', handleEscapeClose);
    }
  },[isOpen, onClose]);

  return(
    <div className={`popup popup_${name} ${togglePopupState}`} onClick={handleClickClose}>
     <div className={`popup__container popup__container_form popup__container_${name}`}>
       <button className={`popup__button-close popup__button-close_${name} page__button`}  aria-label="Кнопка Закрыть форму" type="button" />
       <form className="popup__form" action="#" method="POST" name={`${name}-form`} noValidate autoComplete="off">
         <h2 className="popup__heading">
           {title}
         </h2>
        {children}
         <button className={`popup__button-save popup__button-save_${name} page__button`} type="submit" value="Отправить на сервер" aria-label="Кнопка Сохранить форму">
           {submitText}
         </button>
       </form>
     </div>
    </div>
  )
}

export default PopupWithForm;
