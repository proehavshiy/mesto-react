import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, submitStatus }) {
  //const url = React.useRef('');
  const [inputLink, setInputLink] = React.useState({});

  const submitButtonState = !inputLink.value || !inputLink.value || !inputLink.valid || !inputLink.valid ? false : true;
  const submitButtonText = submitStatus ? 'Сохранить' : 'Сохранение...';

  const inputLinkErrorClass = inputLink.errorMessage ? 'popup__input_error' : '';
  const inputLinkErrorCaption = inputLink.errorMessage ? 'popup__input-error_active' : '';
  const inputLinkErrorMessage = inputLink.errorMessage ? inputLink.errorMessage : '';

  //обработчик формы
  function handleSubmit(evt) {
    evt.preventDefault();

    // Передаём новый url во внешний обработчик
    onUpdateAvatar({
      avatar: inputLink.value
    });
    //после всего - сбрасываю значения, чтобы удалить его из input
    //url.current.value = '';
    setInputLink({
      value : '',
      valid: true,
      errorMessage: ''
      })
  }

   //обработчик инпутов
   function handleUserInput({ target }) {
    const { value, validity, validationMessage } = target;
    const valid = validity.valid;
    const errorMessage = validationMessage;
    setInputLink({
      value,
      valid,
      errorMessage
      })
    }

  return(
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      submitText={submitButtonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonState={submitButtonState}>
      <fieldset className="popup__profile-information">
        <section className="popup__input-section">
          <input className={`popup__input popup__input_image-link ${inputLinkErrorClass}`} value={inputLink.value || ''} onChange={handleUserInput} type="url" name="image-link"  placeholder="Ссылка на картинку" required />
          <span className={`popup__input-error popup__input-error_type_image-link ${inputLinkErrorCaption}`}>
            {inputLinkErrorMessage}
          </span>
        </section>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;

/*
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
*/
