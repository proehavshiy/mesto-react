import React from 'react';

function AuthWithForm({name, title, submitText, onSubmit, submitButtonState, children}) {


  return(
    <div className='authentification'>
     <div className={`authentification__container authentification__container_${name}`}>
       <form className="authentification__form" onSubmit={onSubmit} name={`${name}-form`}  noValidate autoComplete="off">
         <h2 className="authentification__heading">
           {title}
         </h2>
        {children}
         <button className={`authentification__button-save authentification__button-save_${name} page__button ${!submitButtonState && 'authentification__button-save_disabled'}`} disabled={!submitButtonState} type="submit" value="Отправить на сервер" aria-label="Кнопка Сохранить форму">
           {submitText}
         </button>
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
*/
