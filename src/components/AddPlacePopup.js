import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isSubmitting }) {

  const [input, setInput] = React.useState({});

  const submitButtonState = !input.location || !input.link || !input.location.valid || !input.link.valid ? false : true;
  const submitButtonText = isSubmitting ? 'Сохранить' : 'Добавление...';

  const inputTextErrorClass = !input.location || input.location.errorMessage ? 'authentification__input_error' : '';
  const inputTextErrorCaption = !input.location || input.location.errorMessage ? 'authentification__input-error_active' : '';
  const TextErrorMessage = input.location && input.location.errorMessage;

  const inputLinkErrorClass = !input.link || input.link.errorMessage ? 'authentification__input_error'  : '';
  const inputLinkErrorCaption = !input.link || input.link.errorMessage ? 'authentification__input-error_active'  : '';
  const LinkErrorMessage = input.link && input.link.errorMessage;

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

  //обработчик формы
  function handleAddPlaceSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: input.location.value,
      link: input.link.value
    })
  }

  React.useEffect(() => {
    //сбрасываем поля после отправки формы
    //if нужен для того, чтобы в момент ожидания ответа от сервера
    //кнопка не дизейблилась, и данные инпутов не очищались. так некрасиво
    if(isSubmitting === true) {
      setInput({});
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
          <input className={`popup__input popup__input_location-name ${inputTextErrorClass}`} value={input.location ? input.location.value : ''} onChange={handleUserInput} type="text" name="location"  placeholder="Название" required minLength={2} maxLength={30} />
          <span className={`popup__input-error popup__input-error_type_location-name ${inputTextErrorCaption}`}>
            {TextErrorMessage}
          </span>
        </section>
        <section className="popup__input-section">
          <input className={`popup__input popup__input_image-link ${inputLinkErrorClass}`} value={input.link ? input.link.value : ''} onChange={handleUserInput} type="url" name="link"  placeholder="Ссылка на картинку" required />
          <span className={`popup__input-error popup__input-error_type_image-link ${inputLinkErrorCaption}`}>
          {LinkErrorMessage}
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
