import React, { useState } from 'react';

import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';

import Header from './header/Header';
import Main from './main/Main';
import Footer from './footer/Footer';
import PopupWithForm from './popup_with_form/PopupWithForm';
import ImagePopup from './popup_with_image/ImagePopup';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup';

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

  //стейт для юзеринфо
  const [currentUser, setCurrentUser] = React.useState(null);
  //проверяем статус получения данных. Если false, не рендерим Main и Footer
  const [isUserDataReceived, setIsUserDataReceived] = React.useState(false);
  //стейт для карточек
  const [cards, setCards] = React.useState([]);

  React.useEffect(()=> {
    Promise.all([api.getUserInfo(), api.getCards()])
    .then(([userData, cardData]) => {
      setCurrentUser(userData);
      setCards(cardData);
      //console.log('userData',userData)
      setIsUserDataReceived(true);
    })
    .catch(err => {
      console.log("Ошибка получения данных:", err)
    })
  },[])

  //console.log('selectedCard', selectedCard)

  //обновление данных пользователя новыми данными из формы редактирования профиля
  function handleUpdateUser(newUserData) {
    api.sendUserInfo(newUserData)
    .then((newUserDataFromServer) => {
      //обновляем контекст стейт currentUser после редактирования формы
      setCurrentUser(newUserDataFromServer)
    })
    .catch(err => {
      console.log("Ошибка получения данных:", err)
    })
  }

  //обновление аватара новыми данными из формы аватара
  function handleUpdateAvatar(newUrl) {
    api.sendUserAvatar(newUrl)
    .then((newUserDataFromServer) => {
      //обновляем контекст стейт currentUser после редактирования формы
      setCurrentUser(newUserDataFromServer);
    })
    .catch(err => {
      console.log("Ошибка получения данных:", err)
    })
  }

  //колбэк лайка карточки
  function handleCardLike(activatedCard) {
    //проверяем, есть ли уже лайк на этой карточке
    const isLiked = activatedCard.likes.some(like => like._id === currentUser._id);

    //Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(activatedCard._id, !isLiked)
    .then((updatedCard) => {
      //обновляем массив карточек cards для рендеринга с новым кол-вом лайков
      setCards(() => {
        //в изначальном массиве перебираем через map карточки
        //если находим лайкнутую, обновляем ее
        //если находим нелайкнутую, не обновляем ее
        return (cards.map( (card) => {
          return (card._id === activatedCard._id ? updatedCard : card)
        }))
      })
    })
    .catch((err) => {
      console.log("ошибка лайка", err)
    });
  }

  //колбэк удаления карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(
      //после удаления карточки в стейт Cards записываем новый массив оставшихся карточек
      setCards(
        cards.filter(item => {
          //возвращаем только те карточки, которые не совпадают по id с удаленной
          return item._id !== card._id
      }))
    )
    .catch((err) => {
      console.log("ошибка получения данных", err)
    });
  }

  //добавление новой карточки
  function handleAddPlace(newCardData) {
    api.sendNewCard(newCardData)
    .then((newCardFromServer) => {
      //в стейт Cards дозаписываем новую только что созданную карточку
      setCards([newCardFromServer, ...cards])
    })
    .catch(err => {
      console.log("Ошибка получения данных:", err)
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
         <Header/>
         {isUserDataReceived ? (
           <>
            <Main
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}/>
            <Footer />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}/>
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}/>
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlace}/>
           </>
         ) : (
           console.log('ожидание получения данных')
         )}


          <PopupWithForm
          name="confirm-deletion"
          title="Вы уверены?"
          submitText={'Да'}>
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
