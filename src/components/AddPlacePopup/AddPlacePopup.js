import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [text, setText] = React.useState('');
  const [link, setLink ] = React.useState('');

  function handleChangeText(evt) {
    setText(evt.target.value)

    //вызов валидации
    handleCheckInputValidity(evt.target);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value)

    //вызов валидации
    handleCheckInputValidity(evt.target);
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

  //валидация инпутов
  const [isValidInput, setIsValidInput] = React.useState({
    name: '',
    status: ''
  });
  const [errorMessage, setErrorMessage] = React.useState('');
  const [submitButton, setSubmitButton] = React.useState('');
  const toggleInput = isValidInput.status ? ('popup__input_error'):('');
  const toggleError = isValidInput.status ? ('popup__input-error_active'):('');
  const toggleMessage = isValidInput.status && errorMessage;

  //проверка валидности
  function handleCheckInputValidity(input) {
    if (!input.validity.valid) {
      //если валидный
      setIsValidInput({
        name: input.name,
        status: true
      });
      setErrorMessage(input.validationMessage);
      setSubmitButton(true)
    } else {
      //если невалидный
      setIsValidInput({
        name: input.name,
        status: false
      });
      setErrorMessage('');
      setSubmitButton(false)
    }
  }
  //сброс ошибок при закрытии поля
  function resetValidation() {
    setIsValidInput({
      name: '',
      status: true
    });
    setErrorMessage('');
  }

  return(
    <PopupWithForm
      name="add-card"
      title="Новое место"
      submitText={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
      //для валидации узнаем, закрыта ли форма + передаем статус сабмита
      handleResetValidation={resetValidation}
      submitButtonState={submitButton}>
      <fieldset className="popup__profile-information">
        <section className="popup__input-section">
          <input className={`popup__input popup__input_location-name ${isValidInput.name === "location-name" && toggleInput}`} value={text} onChange={handleChangeText} type="text" name="location-name"  placeholder="Название" required minLength={2} maxLength={30} />
          <span className={`popup__input-error popup__input-error_type_location-name ${isValidInput.name === "location-name" && toggleError}`}>
            {toggleMessage}
          </span>
        </section>
        <section className="popup__input-section">
          <input className={`popup__input popup__input_image-link ${isValidInput.name === "image-link" && toggleInput}`} value={link} onChange={handleChangeLink} type="url" name="image-link"  placeholder="Ссылка на картинку" required />
          <span className={`popup__input-error popup__input-error_type_image-link ${isValidInput.name === "image-link" && toggleError}`}>
            {toggleMessage}
          </span>
        </section>
      </fieldset>
      </PopupWithForm>
  )
}

export default AddPlacePopup;
