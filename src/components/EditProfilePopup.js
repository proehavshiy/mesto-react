import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSubmitting }) {
  //подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  //стейт-переменные для управляемых компонентов форм
  const [inputName, setInputName] = React.useState({});
  const [inputDescription, setInputDescription ] = React.useState({});

  const submitButtonState = !inputName.value || !inputDescription.value || !inputName.valid || !inputDescription.valid ? false : true;
  const submitButtonText = isSubmitting ? 'Сохранить' : 'Сохранение...';

  const inputNameErrorClass = inputName.errorMessage ? 'popup__input_error' : '';
  const inputNameErrorCaption = inputName.errorMessage ? 'popup__input-error_active' : '';

  const inputDescriptionErrorClass = inputDescription.errorMessage ? 'popup__input_error' : '';
  const inputDescriptionErrorCaption = inputDescription.errorMessage ? 'popup__input-error_active' : '';

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
  function handleUserInput({ target }) {
    const { name, value, validity: { valid }, validationMessage } = target;

    if (name === "profile-name") {
      setInputName({
        value,
        valid,
        errorMessage: validationMessage
      })
    }
    if (name === "profile-signing") {
      setInputDescription({
        value,
        valid,
        errorMessage: validationMessage
      })
    }
  }

  return (
    <PopupWithForm
      name="change-profile"
      title="Редактировать профиль"
      submitText={submitButtonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonState={submitButtonState}>
      <fieldset className="popup__profile-information">
        <section className="popup__input-section">
          <input className={`popup__input popup__input_profile-name ${inputNameErrorClass}`} value={inputName.value || ''} onChange={handleUserInput} type="text" name="profile-name"  placeholder="Имя" required minLength={2} maxLength={40} />
          <span className={`popup__input-error popup__input-error_type_profile-name ${inputNameErrorCaption}`}>
            {inputName.errorMessage}
          </span>
        </section>
        <section className="popup__input-section">
          <input className={`popup__input popup__input_profile-signing ${inputDescriptionErrorClass}`} value={inputDescription.value || ''} onChange={handleUserInput} type="text" name="profile-signing"  placeholder="Подпись" required minLength={2} maxLength={200} />
          <span className={`popup__input-error popup__input-error_type_profile-signing ${inputDescriptionErrorCaption}`}>
            {inputDescription.errorMessage}
          </span>
        </section>
      </fieldset>
    </PopupWithForm>
  )

}

export default EditProfilePopup;
