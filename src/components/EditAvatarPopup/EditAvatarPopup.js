import React from 'react';
import PopupWithForm from '../popup_with_form/PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const url = React.useRef('');



  //обработчик формы
  function handleSubmit(evt) {
    evt.preventDefault();

    // Передаём новый url через ref во внешний обработчик
    onUpdateAvatar({
      avatar: url.current.value
    });
    //после всего - сбрасываю значение рефа, чтобы удалить его из input
    url.current.value = '';
  }

  return(
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      submitText={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <fieldset className="popup__profile-information">
        <section className="popup__input-section">
          <input className="popup__input popup__input_image-link" ref={url} type="url" name="image-link"  placeholder="Ссылка на картинку" required />
          <span className="popup__input-error popup__input-error_type_image-link" />
        </section>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
