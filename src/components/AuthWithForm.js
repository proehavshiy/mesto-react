import React from 'react';

function PopupWithForm({name, title, submitText, onSubmit, submitButtonState, children}) {


  return(
    <div className='popup_auth'>
     <div className={`popup__container popup__container_form popup__container_${name}`}>
       <form className="popup__form" onSubmit={onSubmit} name={`${name}-form`}  noValidate autoComplete="off">
         <h2 className="popup__heading">
           {title}
         </h2>
        {children}
         <button className={`popup__button-save popup__button-save_${name} page__button ${!submitButtonState && 'popup__button-save_disabled'}`} disabled={!submitButtonState} type="submit" value="Отправить на сервер" aria-label="Кнопка Сохранить форму">
           {submitText}
         </button>
       </form>
     </div>
    </div>
  )
}

export default PopupWithForm;


/*
  function handleClickClose(evt) {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close') || (evt.target.classList.contains('popup__button-save'))) {
      onClose()
    }
  }
*/
