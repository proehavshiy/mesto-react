function PopupWithImage() {
  return(
    <div className="popup popup_open-image">
      <div className="popup__container popup__container_open-image">
        <button className="popup__button-close popup__button-close_open-image page__button" type="button" aria-label="закрыть изображение" />
        <figure className="popup__figure">
          <img className="popup__image" src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg" alt="Архыз" />
          <figcaption className="popup__figcaption" />
        </figure>
      </div>
    </div>
  )
}

export default PopupWithImage;
