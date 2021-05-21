import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [inputText, setInputText] = React.useState('');
  const [inputLink, setInputLink] = React.useState('');

  const toggleButtonState = !inputText.value || !inputLink.value || !inputText.valid || !inputLink.valid ? false : true;
  const inputTextErrorClass = inputText && !inputText.valid && 'popup__input_error';
  const inputTextErrorCaption = inputText && !inputText.valid && 'popup__input-error_active';
  const inputTextErrorMessage = inputText && !inputText.valid && inputText.errorMessage;

  const inputLinkErrorClass = inputLink && !inputLink.valid && 'popup__input_error';
  const inputLinkErrorCaption = inputLink && !inputLink.valid && 'popup__input-error_active';
  const inputLinkErrorMessage = inputLink && !inputLink.valid && inputLink.errorMessage;

  //обработчик инпутов
  function handleUserInput(event) {
    const name = event.target.name;
    const value = event.target.value;
    const valid = event.target.validity.valid;
    const errorMessage = event.target.validationMessage;

    if (name === "location-name") {
      setInputText({
        value : value,
        valid: valid,
        errorMessage: errorMessage
      })
      //console.log('inputText', inputText)
      //console.log('toggleButtonState', toggleButtonState)

    }
    if (name === "image-link") {
      setInputLink({
        value : value,
        valid: valid,
        errorMessage: errorMessage
      })
      //console.log('inputLink', inputLink)
      //console.log('toggleButtonState', toggleButtonState)
    }
  }

  //обработчик формы
  function handleAddPlaceSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: inputText.value,
      link: inputLink.value
    })
    //сбрасываем поля после отправки
    setInputText('')
    setInputLink('')
  }

  return(
    <PopupWithForm
      name="add-card"
      title="Новое место"
      submitText={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
      toggleButtonState={toggleButtonState}>
      <fieldset className="popup__profile-information">
        <section className="popup__input-section">
          <input className={`popup__input popup__input_location-name ${inputTextErrorClass}`} value={inputText.value || ''} onChange={handleUserInput} type="text" name="location-name"  placeholder="Название" required minLength={2} maxLength={30} />
          <span className={`popup__input-error popup__input-error_type_location-name ${inputTextErrorCaption}`}>
            {inputTextErrorMessage}
          </span>
        </section>
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
