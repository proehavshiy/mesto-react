function PopupWithImage({card, isOpen, onClose}) {
  const togglePopupState = isOpen ? 'popup__flexed popup_opened' : 'popup__flexed';
  return(
    <div className={`popup popup_open-image ${togglePopupState}`}>
      <div className="popup__container popup__container_open-image">
        <button className="popup__button-close popup__button-close_open-image page__button" onClick={onClose} type="button" aria-label="закрыть изображение" />
        <figure className="popup__figure">
          <img className="popup__image" src={isOpen ? card.link :("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg")} alt="Архыз" />
          <figcaption className="popup__figcaption">
            {isOpen && card.name}
          </figcaption>
        </figure>
      </div>
    </div>
  )
}

export default PopupWithImage;
