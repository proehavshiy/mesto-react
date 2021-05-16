import React from 'react';
import PopupWithForm from '../popup_with_form/PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [text, setText] = React.useState('');
  const [link, setLink ] = React.useState('');

  function handleChangeText(evt) {
    setText(evt.target.value)
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value)
  }

  //обработчик формы
  function handleAddPlaceSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: text,
      link: link
    })
    //очищаем поля перед закрытием формы
    setText('');
    setLink('');
  }

  return(
    <PopupWithForm
      name="add-card"
      title="Новое место"
      submitText={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}>
      <fieldset className="popup__profile-information">
        <section className="popup__input-section">
          <input className="popup__input popup__input_location-name" value={text} onChange={handleChangeText} type="text" name="location-name"  placeholder="Название" required minLength={2} maxLength={30} />
          <span className="popup__input-error popup__input-error_type_location-name" />
        </section>
        <section className="popup__input-section">
          <input className="popup__input popup__input_image-link" value={link} onChange={handleChangeLink} type="url" name="image-link"  placeholder="Ссылка на картинку" required />
          <span className="popup__input-error popup__input-error_type_image-link" />
        </section>
      </fieldset>
      </PopupWithForm>
  )
}

export default AddPlacePopup;
