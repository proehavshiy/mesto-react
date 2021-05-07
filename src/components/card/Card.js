import React from 'react';

function Card({card, onCardClick}) {
  return(
      <figure className="element">
        <img className="element__image" src={card.link} alt={card.name} onClick={()=>{onCardClick(card)}} />
        <button className="element__button-delete page__button" type="button" aria-label="Удалить карточку" />
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

