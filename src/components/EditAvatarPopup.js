import React from 'react';
import PopupWithForm from './PopupWithForm';

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

  //валидация инпутов
  function handleChange(evt){
    setLink(evt.target.value)

    //вызов валидации
    handleCheckInputValidity(evt.target);
  }
  const [link, setLink] = React.useState('');
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
      name="avatar"
      title="Обновить аватар"
      submitText={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      //для валидации узнаем, закрыта ли форма + передаем статус сабмита
      handleResetValidation={resetValidation}
      submitButtonState={submitButton}>
      <fieldset className="popup__profile-information">
        <section className="popup__input-section">
          <input className={`popup__input popup__input_image-link ${isValidInput.name === "image-link" && toggleInput}`} value={link} onChange={handleChange} ref={url} type="url" name="image-link"  placeholder="Ссылка на картинку" required />
          <span className={`popup__input-error popup__input-error_type_image-link ${isValidInput.name === "image-link" && toggleError}`}>
          {toggleMessage}
          </span>
        </section>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
