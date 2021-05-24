import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isSubmitting }) {
  const [inputText, setInputText] = React.useState({});
  const [inputLink, setInputLink] = React.useState({});

  const submitButtonState = !inputText.value || !inputLink.value || !inputText.valid || !inputLink.valid ? false : true;
  const submitButtonText = isSubmitting ? 'Сохранить' : 'Добавление...';

  const inputTextErrorClass = inputText.errorMessage ? 'popup__input_error' : '';
  const inputTextErrorCaption = inputText.errorMessage ? 'popup__input-error_active' : '';

  const inputLinkErrorClass = inputLink.errorMessage ? 'popup__input_error'  : '';
  const inputLinkErrorCaption = inputLink.errorMessage ? 'popup__input-error_active'  : '';

  //обработчик инпутов
  function handleUserInput({ target }) {
    const { name, value, validity: { valid }, validationMessage } = target;

    if (name === "location-name") {
      setInputText({
        value,
        valid,
        errorMessage: validationMessage
      })
    }
    if (name === "image-link") {
      setInputLink({
        value,
        valid,
        errorMessage: validationMessage
      })
    }
  }

  //обработчик формы
  function handleAddPlaceSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: inputText.value,
      link: inputLink.value
    })
  }

  React.useEffect(() => {
    //сбрасываем поля после отправки формы
    //if нужен для того, чтобы в момент ожидания ответа от сервера
    //кнопка не дизейблилась, и данные инпутов не очищались. так некрасиво
    if(isSubmitting === true) {
      setInputText({});
      setInputLink({});
    }
  }, [isSubmitting]);

  return(
    <PopupWithForm
      name="add-card"
      title="Новое место"
      submitText={submitButtonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
      submitButtonState={submitButtonState}>
      <fieldset className="popup__profile-information">
        <section className="popup__input-section">
          <input className={`popup__input popup__input_location-name ${inputTextErrorClass}`} value={inputText.value || ''} onChange={handleUserInput} type="text" name="location-name"  placeholder="Название" required minLength={2} maxLength={30} />
          <span className={`popup__input-error popup__input-error_type_location-name ${inputTextErrorCaption}`}>
            {inputText.errorMessage}
          </span>
        </section>
        <section className="popup__input-section">
          <input className={`popup__input popup__input_image-link ${inputLinkErrorClass}`} value={inputLink.value || ''} onChange={handleUserInput} type="url" name="image-link"  placeholder="Ссылка на картинку" required />
          <span className={`popup__input-error popup__input-error_type_image-link ${inputLinkErrorCaption}`}>
          {inputLink.errorMessage}
          </span>
        </section>
      </fieldset>
      </PopupWithForm>
  )
}

export default AddPlacePopup;

/*
//для сброса значений при закрытии формы. Зависимость от defaultForm
  // потому что если от isOpen, я не могу добавить карточку. Данные стейтов очищаются раньше, чем отправка происходит
  //приходится 2 раза сбрасывать
  //стейт для сброса полей формы к начальному состоянию
  const [defaultForm, setDefaultForm] = React.useState(false);
  //React.useEffect(()=> {
  //  setInputText('')
  //  setInputLink('')
  //  setDefaultForm(false)
  //},[defaultForm]);
*/
