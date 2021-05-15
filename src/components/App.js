import React, { useState } from 'react';

import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';

import Header from './header/Header'
import Main from './main/Main'
import Footer from './footer/Footer'
import PopupWithForm from './popup_with_form/PopupWithForm'
import ImagePopup from './popup_with_image/ImagePopup'

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  //обработчики открытия-закрытия попапов с формой
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  //попап с картинкой
  function handleCardClick(state) {
    setSelectedCard(state);
  }
  //закрытие попапа
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  //Создайте стейт currentUser в корневом компоненте
  const [currentUser, setCurrentUser] = React.useState({
    //задаем дефолтный шаблон, чтобы в Main при деструктуризации не было ошибки (пока данные по api не пришли)
    about: '',
    avatar: '',
    cohort:'',
    name: '',
    _id:''
  });
  //проверяем статус получения данных. Если false, не рендерим Main
  const [isUserDataReceived, setIsUserDataReceived] = React.useState(false);

  React.useEffect(()=> {
    Promise.all([api.getUserInfo(), api.getCards()])
    .then(([userData, cardData]) => {
      setCurrentUser(userData);
      setIsUserDataReceived(true);
    })
    .catch(err => {
      console.log("Ошибка получения данных:", err)
    })
  },[])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
         <Header/>
         {isUserDataReceived ? (
           <>
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}/>
            <Footer />
           </>
         ) : (
           console.log('ожидание получения данных')
         )}
         <PopupWithForm
         name="change-profile"
         title="Редактировать профиль"
         submitText={'Сохранить'}
         isOpen={isEditProfilePopupOpen}
         onClose={closeAllPopups}>
          <fieldset className="popup__profile-information">
            <section className="popup__input-section">
              <input className="popup__input popup__input_profile-name" type="text" name="profile-name"  placeholder="Имя" required minLength={2} maxLength={40} />
              <span className="popup__input-error popup__input-error_type_profile-name" />
            </section>
            <section className="popup__input-section">
              <input className="popup__input popup__input_profile-signing" type="text" name="profile-signing"  placeholder="Подпись" required minLength={2} maxLength={200} />
              <span className="popup__input-error popup__input-error_type_profile-signing" />
            </section>
            </fieldset>
          </PopupWithForm>
          <PopupWithForm
          name="add-card"
          title="Новое место"
          submitText={'Сохранить'}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}>
            <fieldset className="popup__profile-information">
              <section className="popup__input-section">
                <input className="popup__input popup__input_location-name" type="text" name="location-name"  placeholder="Название" required minLength={2} maxLength={30} />
                <span className="popup__input-error popup__input-error_type_location-name" />
              </section>
              <section className="popup__input-section">
                <input className="popup__input popup__input_image-link" type="url" name="image-link"  placeholder="Ссылка на картинку" required />
                <span className="popup__input-error popup__input-error_type_image-link" />
              </section>
              </fieldset>
          </PopupWithForm>
          <PopupWithForm
          name="confirm-deletion"
          title="Вы уверены?"
          submitText={'Да'}>
          </PopupWithForm>
          <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          submitText={'Сохранить'}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}>
            <fieldset className="popup__profile-information">
              <section className="popup__input-section">
                <input className="popup__input popup__input_image-link" type="url" name="image-link"  placeholder="Ссылка на картинку" required />
                <span className="popup__input-error popup__input-error_type_image-link" />
              </section>
            </fieldset>
          </PopupWithForm>
          <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
