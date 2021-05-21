import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  //подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  //стейт-переменные для управляемых компонентов форм
  const [inputName, setInputName] = React.useState('');
  const [inputDescription, setInputDescription ] = React.useState('');

  const toggleButtonState = !inputName.value || !inputDescription.value || !inputName.valid || !inputDescription.valid ? false : true;
  const inputNameErrorClass = inputName && !inputName.valid && 'popup__input_error';
  const inputNameErrorCaption = inputName && !inputName.valid && 'popup__input-error_active';
  const inputNameErrorMessage = inputName && !inputName.valid && inputName.errorMessage;

  const inputDescriptionErrorClass = inputDescription && !inputDescription.valid && 'popup__input_error';
  const inputDescriptionErrorCaption = inputDescription && !inputDescription.valid && 'popup__input-error_active';
  const inputDescriptionErrorMessage = inputDescription && !inputDescription.valid && inputDescription.errorMessage;

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setInputName({
      value: currentUser.name,
      valid: true,
      errorMessage: ''
    });
    setInputDescription({
      value: currentUser.about,
      valid: true,
      errorMessage: ''
    });
  }, [currentUser]);

  //обработчик формы
  function handleSubmit(evt) {
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: inputName.value,
      about: inputDescription.value,
    });
  }

  //обработчик инпутов
  function handleUserInput(event) {
    const name = event.target.name;
    const value = event.target.value;
    const valid = event.target.validity.valid;
    const errorMessage = event.target.validationMessage;

    if (name === "profile-name") {
      setInputName({
        value : value,
        valid: valid,
        errorMessage: errorMessage
      })
    }
    if (name === "profile-signing") {
      setInputDescription({
        value : value,
        valid: valid,
        errorMessage: errorMessage
      })
    }
  }

  return (
    <PopupWithForm
      name="change-profile"
      title="Редактировать профиль"
      submitText={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      toggleButtonState={toggleButtonState}>
      <fieldset className="popup__profile-information">
        <section className="popup__input-section">
          <input className={`popup__input popup__input_profile-name ${inputNameErrorClass}`} value={inputName.value || ''} onChange={handleUserInput} type="text" name="profile-name"  placeholder="Имя" required minLength={2} maxLength={40} />
          <span className={`popup__input-error popup__input-error_type_profile-name ${inputNameErrorCaption}`}>
            {inputNameErrorMessage}
          </span>
        </section>
        <section className="popup__input-section">
          <input className={`popup__input popup__input_profile-signing ${inputDescriptionErrorClass}`} value={inputDescription.value || ''} onChange={handleUserInput} type="text" name="profile-signing"  placeholder="Подпись" required minLength={2} maxLength={200} />
          <span className={`popup__input-error popup__input-error_type_profile-signing ${inputDescriptionErrorCaption}`}>
            {inputDescriptionErrorMessage}
          </span>
        </section>
      </fieldset>
    </PopupWithForm>
  )

}

export default EditProfilePopup;
