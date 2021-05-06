function ImagePopup({card, onClose}) {
  const togglePopupState = card ?'popup__flexed popup_opened' : 'popup__flexed';
  return(
    <div className={`popup popup_open-image ${togglePopupState}`} onClick={onClose}>
      <div className="popup__container popup__container_open-image">
        {card ? (
          <>
          <button className="popup__button-close popup__button-close_open-image page__button"  type="button" aria-label="закрыть изображение" />
          <figure className="popup__figure">
            <img className="popup__image" src={card.link} alt={`картинка: ${card.name}`} />
            <figcaption className="popup__figcaption">
              {card.name}
            </figcaption>
          </figure>
          </>
        ) : ''}
      </div>
    </div>
  )
}
export default ImagePopup;

