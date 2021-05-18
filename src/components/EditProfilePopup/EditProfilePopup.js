import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import PopupWithForm from '../PopupWithForm/PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  //подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  //стейт-переменные для управляемых компонентов форм
  const [name, setName] = React.useState('');
  const [description, setDescription ] = React.useState('');

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setSubmitButton(false)
  }, [currentUser]);

  //обработчик формы
  function handleSubmit(evt) {
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  function handleChangeName(evt) {
    setName(evt.target.value)

    //вызов валидации
    handleCheckInputValidity(evt.target);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value)

    //вызов валидации
    handleCheckInputValidity(evt.target);
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

  return (
    <PopupWithForm
      name="change-profile"
      title="Редактировать профиль"
      submitText={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      //для валидации узнаем, закрыта ли форма + передаем статус сабмита
      handleResetValidation={resetValidation}
      submitButtonState={submitButton}>
      <fieldset className="popup__profile-information">
        <section className="popup__input-section">
          <input className={`popup__input popup__input_profile-name ${isValidInput.name === "profile-name" && toggleInput}`} value={name} onChange={handleChangeName} type="text" name="profile-name"  placeholder="Имя" required minLength={2} maxLength={40} />
          <span className={`popup__input-error popup__input-error_type_profile-name ${isValidInput.name === "profile-name" && toggleError}`}>
            {toggleMessage}
          </span>
        </section>
        <section className="popup__input-section">
          <input className={`popup__input popup__input_profile-signing ${isValidInput.name === "profile-signing" && toggleInput}`} value={description} onChange={handleChangeDescription} type="text" name="profile-signing"  placeholder="Подпись" required minLength={2} maxLength={200} />
          <span className={`popup__input-error popup__input-error_type_profile-signing ${isValidInput.name === "profile-signing" && toggleError}`}>
            {toggleMessage}
          </span>
        </section>
      </fieldset>
    </PopupWithForm>
  )

}

export default EditProfilePopup;
