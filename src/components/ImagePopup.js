import React from 'react';
import Popup from './Popup';

function ImagePopup({ card, onClose }) {

  // const togglePopupState = card ? 'popup__flexed popup_opened' : 'popup__flexed';

  // //закрытие по крестику, по клику вне формы
  // function handleOverlayClose(evt) {
  //   if (evt.target === evt.currentTarget) {
  //     onClose()
  //   }
  // }
  // function handleButtonClose(evt) {
  //   if (evt.target === evt.currentTarget) {
  //     onClose()
  //   }
  // }

  // //закрытие по Esc попапов
  // React.useEffect(() => {
  //   if (!card) return;

  //   const handleEscapeClose = (evt) => {
  //     if (evt.key === 'Escape') {
  //       onClose();
  //     }
  //   }
  //   document.addEventListener('keyup', handleEscapeClose);
  //   return () => {
  //     document.removeEventListener('keyup', handleEscapeClose);
  //   }
  // }, [card, onClose]);

  return (
    <Popup
      name='open-image'
      isOpen={card}
      onClose={onClose}>
      <figure className="popup__figure">
        <img className="popup__image" src={card ? card.link : ''} alt={card ? `картинка: ${card.name}` : ''} />
        <figcaption className="popup__figcaption">
          {card ? card.name : ''}
        </figcaption>
      </figure>
    </Popup>
  )
}
export default ImagePopup;

/*
<div className={`popup popup_open-image ${togglePopupState}`} onClick={handleOverlayClose}>
      <div className="popup__container popup__container_open-image">
        {card ? (
          <button className="page__button page__button_type_close popup__button-close popup__button-close_open-image" onClick={handleButtonClose} type="button" aria-label="закрыть изображение" />
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
*/
