import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSubmitting }) {
  //подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  //стейт-переменная для управляемых компонентов формы
  const [input, setInput] = React.useState({});

  const submitButtonState = !input.name || !input.signing || !input.name.valid || !input.signing.valid ? false : true;
  const submitButtonText = isSubmitting ? 'Сохранить' : 'Сохранение...';

  const inputNameErrorClass = !input.name || input.name.errorMessage ? 'authentification__input_error' : '';
  const inputNameErrorCaption = !input.name || input.name.errorMessage ? 'authentification__input-error_active' : '';
  const nameErrorMessage = input.name && input.name.errorMessage;

  const inputSigningErrorClass = !input.signing || input.signing.errorMessage ? 'authentification__input_error'  : '';
  const inputSigningErrorCaption = !input.signing || input.signing.errorMessage ? 'authentification__input-error_active'  : '';
  const signingErrorMessage = input.signing && input.signing.errorMessage;

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setInput(prevState => ({
      ...prevState,
      name: {
        value: currentUser.name,
        valid: true,
        errorMessage: ''
      },
      signing: {
        value: currentUser.about,
        valid: true,
        errorMessage: ''
      }
      })
    );
  }, [currentUser]);

  //обработчик формы
  function handleSubmit(evt) {
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: input.name.value,
      about: input.signing.value,
    });
  }

  //обработчик инпутов
  function handleUserInput({ target }) {
    const { name, value, validity: { valid }, validationMessage } = target;

    setInput(prevState => ({
      ...prevState,
      [name]: {
        value,
        valid,
        errorMessage: validationMessage
      }
    }))
  }

  return (
    <PopupWithForm
      name="change-profile"
      title = "Редактировать профиль"
      submitText={submitButtonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonState={submitButtonState}>
      <fieldset className="popup__profile-information">
        <section className="popup__input-section">
          <input className={`popup__input popup__input_profile-name ${inputNameErrorClass}`} value={input.name ? input.name.value : ''} onChange={handleUserInput} type="text" name="name"  placeholder="Имя" required minLength={2} maxLength={40} />
          <span className={`popup__input-error popup__input-error_type_profile-name ${inputNameErrorCaption}`}>
            {nameErrorMessage}
          </span>
        </section>
        <section className="popup__input-section">
          <input className={`popup__input popup__input_profile-signing ${inputSigningErrorClass}`} value={input.signing ? input.signing.value : ''} onChange={handleUserInput} type="text" name="signing"  placeholder="Подпись" required minLength={2} maxLength={200} />
          <span className={`popup__input-error popup__input-error_type_profile-signing ${inputSigningErrorCaption}`}>
            {signingErrorMessage}
          </span>
        </section>
      </fieldset>
    </PopupWithForm>
  )

}

export default EditProfilePopup;
