import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import api from '../utils/api';
import * as auth from '../utils/auth';
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
import StatusPopup from './StatusPopup';
import ProtectedRoute from './ProtectedRoute';
import Spinner from './Spinner';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [cardForDeletion, setCardForDeletion] = React.useState('');
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [loggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const history = useHistory();
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
    place: true,
    login: true,
    register: true,
    deletion: true
  });
  const [isStatusPopupOpen, setIsStatusPopupOpen] = React.useState(false);
  const [popupStatusMessage, setPopupStatusMessage] = React.useState({
    errorStatus: null,
    message: '',
  });

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
    setCardForDeletion('');
    setIsStatusPopupOpen(false);
    // setTimeout(setPopupStatusMessage({
    //   errorStatus: null,
    //   message: '',
    // }), 1000);
  }


  React.useEffect(() => {
    //запросы на получение инфы о юзере и карточках посылаются только когда юзер залогинен
    //а то тупо как-то впустую запросы слать
    loggedIn && (
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([userData, cardData]) => {
          setCurrentUser(userData);
          setCards(cardData);
          setIsUserDataReceived(true);
        })
        .catch(err => {
          console.log("Ошибка получения данных:", err)
        })
    )

  }, [loggedIn])

  //обновление данных пользователя новыми данными из формы редактирования профиля
  function handleUpdateUser(newUserData) {
    //submit status в момент ожидания
    setIsSubmitting(prevState => ({
      ...prevState,
      profile: false
    }))

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
        setIsSubmitting(prevState => ({
          ...prevState,
          profile: true
        }))
      })
  }

  //обновление аватара новыми данными из формы аватара
  function handleUpdateAvatar(newUrl) {
    //submit status в момент ожидания
    setIsSubmitting(prevState => ({
      ...prevState,
      avatar: false
    }));
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
        setIsSubmitting(prevState => ({
          ...prevState,
          avatar: true
        }));
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
    //меняем стейт кнопки на ожидание
    setIsSubmitting(prevState => ({
      ...prevState,
      deletion: false
    }))
    api.deleteCard(card._id)
      .then(() => {
        //оборачиваем setCards в колбек, чтобы удаление карточки со страницы происходило только после возвращения ответа от сервера
        //после удаления карточки в стейт Cards записываем новый массив оставшихся карточек
        setCards(
          cards.filter(item => {
            //возвращаем только те карточки, которые не совпадают по id с удаленной
            return item._id !== card._id
          }))
        closeAllPopups();
      })
      .catch((err) => {
        console.log("ошибка получения данных", err)
      })
      .finally(() => {
        setIsSubmitting(prevState => ({
          ...prevState,
          deletion: true
        }))
      })
  }

  //добавление новой карточки
  function handleAddPlace(newCardData) {
    //submit status в момент ожидания
    setIsSubmitting(prevState => ({
      ...prevState,
      place: false
    }));
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
        setIsSubmitting(prevState => ({
          ...prevState,
          place: true
        }));
      })
  }

  //обработчики форм

  function setErrorMessage(status) {
    const errorTexts = {
      '400': {
        errorType: 'fault',
        errorText: 'Некорректно заполнено одно из полей',
      },
      '401': {
        errorType: 'fault',
        errorText: 'Некорректный email или пароль',
      },
      '201': {
        errorType: 'success',
        errorText: 'Вы успешно зарегистрировались!',
      },
      other: {
        errorType: 'fault',
        errorText: 'Что - то пошло не так! Попробуйте ещё раз.',
      }
    }

    setPopupStatusMessage({
      errorType: errorTexts[status].errorType,
      errorText: errorTexts[status].errorText,
    })
  }

  //сабмит регистрации
  function handleRegister(email, password) {
    //меняем стейт кнопки на ожидание
    setIsSubmitting(prevState => ({
      ...prevState,
      register: false
    }))

    auth.register(email, password)
      .then(data => {
        console.log('reg:', data);
        //добавляем успешный месседж для попапа
        if (data) {
          setIsStatusPopupOpen(true);
          setErrorMessage(201);
        }
      })
      .catch(err => {
        setIsStatusPopupOpen(true);
        setErrorMessage(err);
      })
      .finally(() => {
        setIsSubmitting(prevState => ({
          ...prevState,
          register: true
        }))
      })
  }

  //сабмит логина
  function handleLogin(email, password) {
    //меняем стейт кнопки на ожидание
    setIsSubmitting(prevState => ({
      ...prevState,
      login: false
    }))
    if (!email || !password) {
      return
    }
    auth.login(email, password)
      .then(data => {
        if (data.token) {
          localStorage.setItem('jwt', data.token)
          //запишем емейл для подстановки в шапку, потому что он не подставляется в шапку при входе через логин
          setEmail(email)
          setIsLoggedIn(true);
        }
      })
      .catch(err => {
        setIsStatusPopupOpen(true);
        setErrorMessage(err);
      })
      .finally(() => {
        setIsSubmitting(prevState => ({
          ...prevState,
          login: true
        }))
      })
  }

  //разлогиниться
  function handleSignOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    history.push('/sign-in');
  }

  // если у пользователя есть токен в localStorage
  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then(res => {
          if (res) {
            //запишем емейл для подстановки в шапку
            setEmail(res.data.email)
            setIsLoggedIn(true);
            //history.push('/');
          }
        })
        .catch(err => {
          setIsStatusPopupOpen(true);
          setErrorMessage(err);
        })
    }
  }
  //срабатывание проверки токена и автологина при загрузке страницы
  React.useEffect(() => {
    checkToken()
  }, [])

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn])


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          onSignOut={handleSignOut}
          email={email} />
        <Route exact path="/">
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
        </Route>

        <>
          <Route path='/sign-up'>
            <Register
              onRegister={handleRegister}
              isSubmitting={isSubmitting.register} />
          </Route>
          <Route path='/sign-in'>
            <Login
              onLogin={handleLogin}
              isSubmitting={isSubmitting.login} />
          </Route>
          <StatusPopup
            isOpen={isStatusPopupOpen}
            onClose={closeAllPopups}
            popupStatusMessage={popupStatusMessage} />
        </>
        {isUserDataReceived &&//если ответ с инфо и карточками не получен - показываем спиннер
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
              onCardDelete={setCardForDeletion}
              component={Main} />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              isSubmitting={isSubmitting.profile} />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              isSubmitting={isSubmitting.avatar} />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlace}
              isSubmitting={isSubmitting.place} />
            <ImagePopup
              card={selectedCard}
              onClose={closeAllPopups} />
            <PopupConfirmDeletion
              onClose={closeAllPopups}
              handleCardDelete={handleCardDelete}
              cardForDeletion={cardForDeletion}
              isSubmitting={isSubmitting.deletion} />
            <Footer />
          </>
        }
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;


// return (
//   <CurrentUserContext.Provider value={currentUser}>
//     <div className="page">
//       <Header
//         onSignOut={onSignOut}
//         email={email}
//         loggedIn={loggedIn} />
//       {loggedIn ? ( //если залогинен - отображаем контент или спиннер
//         isUserDataReceived ? (//если ответ с инфо и карточками не получен - показываем спиннер
//           <>
//             <ProtectedRoute
//               path='/'
//               loggedIn={loggedIn}
//               cards={cards}
//               onEditProfile={handleEditProfileClick}
//               onAddPlace={handleAddPlaceClick}
//               onEditAvatar={handleEditAvatarClick}
//               onCardClick={handleCardClick}
//               onCardLike={handleCardLike}
//               onCardDelete={setCardForDeletion}
//               component={Main} />
//             <EditProfilePopup
//               isOpen={isEditProfilePopupOpen}
//               onClose={closeAllPopups}
//               onUpdateUser={handleUpdateUser}
//               isSubmitting={isSubmitting.profile} />
//             <EditAvatarPopup
//               isOpen={isEditAvatarPopupOpen}
//               onClose={closeAllPopups}
//               onUpdateAvatar={handleUpdateAvatar}
//               isSubmitting={isSubmitting.avatar} />
//             <AddPlacePopup
//               isOpen={isAddPlacePopupOpen}
//               onClose={closeAllPopups}
//               onAddPlace={handleAddPlace}
//               isSubmitting={isSubmitting.place} />
//             <ImagePopup
//               card={selectedCard}
//               onClose={closeAllPopups} />
//             <PopupConfirmDeletion
//               onClose={closeAllPopups}
//               handleCardDelete={handleCardDelete}
//               cardForDeletion={cardForDeletion}
//               isSubmitting={isSubmitting.deletion} />
//           </>
//         ) : (
//           <Spinner />
//         )
//       ) : (
//         <>
//           <Route path='/sign-up'>
//             <Register
//               onRegister={handleRegister}
//               isSubmitting={isSubmitting.register} />
//           </Route>
//           <Route path='/sign-in'>
//             <Login
//               onLogin={onLogin}
//               isSubmitting={isSubmitting.login} />
//           </Route>
//           <StatusPopup
//             isOpen={popupStatusMessage}
//             onClose={closeAllPopups}
//             popupStatusMessage={popupStatusMessage} />
//         </>
//       )}
//       <Footer />
//     </div>
//   </CurrentUserContext.Provider>
// );
// }
