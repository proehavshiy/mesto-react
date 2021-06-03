import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import api from '../utils/api';
import { getContent } from '../utils/auth';
import CurrentUserContext from '../contexts/CurrentUserContext';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupConfirmDeletion from './PopupConfirmDeletion';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import Spinner from './Spinner';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const history = useHistory();

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
  // submit status
  const [isSubmitting, setIsSubmitting] = React.useState({
    profile: true,
    avatar: true,
    place: true
  });

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

  //обновление данных пользователя новыми данными из формы редактирования профиля
  function handleUpdateUser(newUserData) {
    //submit status в момент ожидания
    setIsSubmitting({
      profile: false,
      avatar: true,
      place: true
    });
    api.sendUserInfo(newUserData)
    .then((newUserDataFromServer) => {
      //обновляем контекст стейт currentUser после редактирования формы
      setCurrentUser(newUserDataFromServer);
      closeAllPopups();
    })
    .catch(err => {
      console.log("Ошибка получения данных:", err)
    })
    .finally(() => {
      //submit status в конце
      setIsSubmitting({
        profile: true,
        avatar: true,
        place: true
      });
    })
  }

  //обновление аватара новыми данными из формы аватара
  function handleUpdateAvatar(newUrl) {
    //submit status в момент ожидания
    setIsSubmitting({
      profile: true,
      avatar: false,
      place: true
    });
    api.sendUserAvatar(newUrl)
    .then((newUserDataFromServer) => {
      //обновляем контекст стейт currentUser после редактирования формы
      setCurrentUser(newUserDataFromServer);
      closeAllPopups();
    })
    .catch(err => {
      console.log("Ошибка получения данных:", err)
    })
    .finally(() => {
      //submit status в конце
      setIsSubmitting({
        profile: true,
        avatar: true,
        place: true
      });
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
      setCards((state) => state.map((c) => c._id === activatedCard._id ? updatedCard : c));
      //setCards((state) => {
      //  //в изначальном массиве перебираем через map карточки
      //  //если находим лайкнутую, обновляем ее
      //  //если находим нелайкнутую, не обновляем ее
      //  return (state.map( (card) => {
      //    return (card._id === activatedCard._id ? updatedCard : card)
      //  }))
      //})
    })
    .catch((err) => {
      console.log("ошибка лайка", err)
    });
  }

  //колбэк удаления карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then( () => {
      //оборачиваем setCards в колбек, чтобы удаление карточки со страницы происходило только после возвращения ответа от сервера
      //после удаления карточки в стейт Cards записываем новый массив оставшихся карточек
      setCards(
        cards.filter(item => {
          //возвращаем только те карточки, которые не совпадают по id с удаленной
          return item._id !== card._id
      }))
    }

    )
    .catch((err) => {
      console.log("ошибка получения данных", err)
    });
  }

  //добавление новой карточки
  function handleAddPlace(newCardData) {
    //submit status в момент ожидания
    setIsSubmitting({
      profile: true,
      avatar: true,
      place: false
    });
    api.sendNewCard(newCardData)
    .then((newCardFromServer) => {
      //в стейт Cards дозаписываем новую только что созданную карточку
      setCards([newCardFromServer, ...cards]);
      closeAllPopups();
    })
    .catch(err => {
      console.log("Ошибка получения данных:", err)
    })
    .finally(() => {
      //submit status в конце
      setIsSubmitting({
        profile: true,
        avatar: true,
        place: true
      });
    })
  }

  //хук залогинен ли пользователь
  const [loggedIn, setIsLoggedIn] = React.useState(false);

  function tokenCheck(){
    // если у пользователя есть токен в localStorage, 
    // эта функция проверит, действующий он или нет
    if(localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      if(jwt){
        getContent(jwt)
        .then(res => {
          if(res){
            //запишем емейл для подстановки в шапку
            setEmail(res.data.email)
            setIsLoggedIn(true);
            history.push('/');
          }
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  }
  //срабатывание проверки токена и автологина при загрузке страницы
  React.useEffect(()=>{
    tokenCheck()
    console.log('залогонен по токену')
  },[])


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
       <Header
       loggedIn={loggedIn}
       setIsLoggedIn={setIsLoggedIn}
       email={email}/>
       <Switch>
         {isUserDataReceived ? (
           <>
            <ProtectedRoute
            path='/'
            loggedIn={loggedIn}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            component={Main}/>
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              isSubmitting={isSubmitting.profile}/>
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              isSubmitting={isSubmitting.avatar}/>
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlace}
              isSubmitting={isSubmitting.place}/>
            <ImagePopup
              card={selectedCard}
              onClose={closeAllPopups}/>
            <PopupConfirmDeletion />
            <Route path='/sign-up'>
            <Register
              isSubmitting={true}
              setIsLoggedIn={setIsLoggedIn} />
            </Route>
            <Route path='/sign-in'>
              <Login
              isSubmitting={true}
              setIsLoggedIn={setIsLoggedIn}
              setEmail={setEmail} />
            </Route>
            <Footer />
           </>
         ) : (
          <Spinner/>
         )}
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

/*
{loggedIn ? (<Redirect to='/' />) : (<Redirect to='/sign-in' />)}

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
             onUpdateUser={handleUpdateUser}
             isSubmitting={isSubmitting.profile}/>
           <EditAvatarPopup
             isOpen={isEditAvatarPopupOpen}
             onClose={closeAllPopups}
             onUpdateAvatar={handleUpdateAvatar}
             isSubmitting={isSubmitting.avatar}/>
           <AddPlacePopup
             isOpen={isAddPlacePopupOpen}
             onClose={closeAllPopups}
             onAddPlace={handleAddPlace}
             isSubmitting={isSubmitting.place}/>
           <ImagePopup
             card={selectedCard}
             onClose={closeAllPopups}/>
           <PopupConfirmDeletion />
           </>
        ) : (
        <Spinner/>
        )}
*/