import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import api from '../../utils/api';
import Card from '../card/Card';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  //подписка на контекст
  const { name, about, avatar, _id } = React.useContext(CurrentUserContext);
  //const cards = React.useContext(CurrentUserContext)[1];

  const [cards, setCards] = React.useState([]);

  React.useEffect(()=> {
    api.getCards()
    .then((cardData) => {
      setCards(cardData);
      //console.log('cardData Main',cardData[0])
    })
    .catch((err) => {
      console.log("ошибка получения данных", err)
    })
  },[])

  console.log('cards main', cards)

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(like => like._id === _id);
    //console.log('card._id', card.likes._id)
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      //ЭТОТ КОД НЕ ПОНЯЛ ПОКА. И НЕ УВЕРЕН ЧТО РАБОТАЕТ, РАЗОБРАТЬСЯ И ПРОВЕРИТЬ, КОГДА АПИ ЗАРАБОТАЕТ
        setCards(
          (state) => {
          //console.log(state);
          //массив карточек уже полученный => каждая карточка._id если равен Id лайкнутой карточке, то получаем новый массив карточек.
          //если нет, то оставляем старый
          //возможно, что такая логика, но я еще не уверен. И что за state такой? по идее это должно быть стейт cards
          state.map((c) => c._id === card._id ? newCard : c)
          }
        );
    })
    .catch((err) => {
      console.log("ошибка получения данных", err)
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

  return(
    <main className="content">
      <section className="profile page__section page__profile">
        <div className="profile__avatar avatar-form-open-button" style={{backgroundImage: `url(${avatar})`}} onClick={onEditAvatar}/>
        <div className="profile__info">
          <h1 className="profile__title">
            {name}
          </h1>
          <button className="profile__change-button page__button profile-form-open-button" onClick={onEditProfile} type="button" aria-label="Кнопка Редактировать профиль" />
          <p className="profile__subtitle">
            {about}
          </p>
        </div>
        <button className="profile__add-button page__button add-card-form-open-button" onClick={onAddPlace} type="button" aria-label="Кнопка Добавить карточку" />
      </section>
      <section className="elements page__section">
      {cards.map((card) => (
        <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
        )
      )}
      </section>
    </main>
  )
}
export default Main;

/*
{cards.map(({ _id, ...card }) => (
        <Card key={_id} card={card} onCardClick={onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
        )
      )}
*/
