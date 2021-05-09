import React from 'react';

function ImagePopup({card, onClose}) {
  const togglePopupState = card ?'popup__flexed popup_opened' : 'popup__flexed';

  //закрытие по крестику и по клику вне формы
  function handleClickClose(evt) {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close')) {
      onClose()
    }
  }
  //закрытие по Esc попапов
  React.useEffect(()=> {
    if (!card) return;

    const handleEscapeClose = (evt) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keyup',handleEscapeClose);
    return () => {
      document.removeEventListener('keyup', handleEscapeClose);
    }
  },[card, onClose]);

  return(
    <div className={`popup popup_open-image ${togglePopupState}`} onClick={handleClickClose}>
      <div className="popup__container popup__container_open-image">
          {card ? (
            <button className="popup__button-close popup__button-close_open-image page__button"  type="button" aria-label="закрыть изображение" />
            ) : ('')
          }
          <figure className="popup__figure">
            <img className="popup__image" src={card ? card.link : ''} alt={card ? `картинка: ${card.name}` : ''} />
            <figcaption className="popup__figcaption">
              {card ? card.name : ''}
            </figcaption>
          </figure>
      </div>
    </div>
  )
}
export default ImagePopup;

/*
return (
    <div className={\`popup popup_type_image ${card && 'popup_is-opened'}\`}>
      <div className="popup__content popup__content_content_image">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img alt={card ? card.name : ''} src={card ? card.link : ''} className="popup__image" />
        <p className="popup__caption">{card ? card.name : ''}</p>
      </div>
    </div>


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
  );
*/
