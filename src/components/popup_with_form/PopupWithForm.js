function PopupWithForm({name, title, submitText, isOpen, onClose, children}) {
  console.log(`в форме ${name}`, isOpen)
  const togglePopupState = isOpen ? 'popup__flexed popup_opened' : 'popup__flexed';
  return(
    <div className={`popup popup_${name} ${togglePopupState}`} >
     <div className={`popup__container popup__container_form popup__container_${name}`}>
       <button className={`popup__button-close popup__button-close_${name} page__button`} onClick={onClose} aria-label="Кнопка Закрыть форму" type="button" />
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
