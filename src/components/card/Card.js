import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Card({ card, onCardClick} ) {
  //подписка на контекст
  const currentUser = React.useContext(CurrentUserContext)[0];

  //проверяем, наша ли карточка. нужен для добавнения кнопки удаления
  const isOwn = card.owner._id === currentUser._id;

 function handleClick() {
   onCardClick(card);
 }

 // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
const isLiked = card.likes.some(item => {
  return item._id === currentUser._id;
});

// Создаём переменную, которую после зададим в `className` для кнопки лайка
const cardLikeButtonClassName = `...`;

//console.log('cardowner', card.owner._id)
//console.log('isOwn', isOwn)
//console.log('isLiked', isLiked)

return (
  <figure className="element" key={card._id}>
    <img className="element__image" src={card.link} alt={card.name} onClick={handleClick} />
    {isOwn && (
      <button className="element__button-delete page__button" type="button" aria-label="Удалить карточку" />
    )}
    <figcaption className="element__figcaption">
      <h2 className="element__card-title">
      {card.name}
      </h2>
      <div className="element__like-section">
        <button className="element__button-like page__button" type="button" />
        <p className="element__like-counter">
        {card.likes.length}
        </p>
      </div>
    </figcaption>
  </figure>
  )
}
export default Card;


