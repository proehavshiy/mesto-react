import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import api from '../../utils/api';
import Card from '../card/Card';

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {
  //подписка на контекст
  const { name, about, avatar, _id } = React.useContext(CurrentUserContext);
  //const cards = React.useContext(CurrentUserContext)[1];

  //const [cards, setCards] = React.useState([]);

  //React.useEffect(()=> {
  //  api.getCards()
  //  .then((cardData) => {
  //    setCards(cardData);
  //  })
  //  .catch((err) => {
  //    console.log("ошибка получения данных", err)
  //  })
  //},[])

  //console.log('cards main', cards)



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
        <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
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
