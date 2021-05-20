import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';

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
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value)
  }

  return (
    <PopupWithForm
      name="change-profile"
      title="Редактировать профиль"
      submitText={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <fieldset className="popup__profile-information">
        <section className="popup__input-section">
          <input className={`popup__input popup__input_profile-name`} value={name} onChange={handleChangeName} type="text" name="profile-name"  placeholder="Имя" required minLength={2} maxLength={40} />
          <span className={`popup__input-error popup__input-error_type_profile-name`}>
          </span>
        </section>
        <section className="popup__input-section">
          <input className={`popup__input popup__input_profile-signing`} value={description} onChange={handleChangeDescription} type="text" name="profile-signing"  placeholder="Подпись" required minLength={2} maxLength={200} />
          <span className={`popup__input-error popup__input-error_type_profile-signing`}>
          </span>
        </section>
      </fieldset>
    </PopupWithForm>
  )

}

export default EditProfilePopup;
