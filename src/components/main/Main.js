import React from 'react';
import api from '../../utils/api';
import Card from '../card/Card';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

  //получаем инфо о профиле и карточки с сервера
  const [userName, setUserName] = React.useState(null);
  const [userDescription, setUserDescription ] = React.useState(null);
  const [userAvatar, setUserAvatar] = React.useState(null);
  const [cards, setCards] = React.useState([]);

  React.useEffect(()=> {
    Promise.all([api.getUserInfo(), api.getCards()])
    .then(([userData, cardData]) => {
      setUserName(userData.name);
      setUserDescription(userData.about);
      setUserAvatar(userData.avatar);
      setCards(cardData);
    })
    .catch(err => {
      console.log("Ошибка получения данных:", err)
    })
  },[])//[] пустой массив в зависимости, чтобы запрос к Api был 1 раз при первонач рендере

  return(
    <main className="content">
      <section className="profile page__section page__profile">
        <div className="profile__avatar avatar-form-open-button" style={{backgroundImage: `url(${userAvatar})`}} onClick={onEditAvatar}/>
        <div className="profile__info">
          <h1 className="profile__title">
            {userName}
          </h1>
          <button className="profile__change-button page__button profile-form-open-button" onClick={onEditProfile} type="button" aria-label="Кнопка Редактировать профиль" />
          <p className="profile__subtitle">
            {userDescription}
          </p>
        </div>
        <button className="profile__add-button page__button add-card-form-open-button" onClick={onAddPlace} type="button" aria-label="Кнопка Добавить карточку" />
      </section>
      <section className="elements page__section">
      {cards.map(({ _id, ...card }) => (
        <Card key={_id} card={card} onCardClick={onCardClick} />
        )
      )}
      </section>
    </main>
  )
}
export default Main;
