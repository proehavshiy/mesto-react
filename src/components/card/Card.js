function Card({cards, onCardClick}) {
  //для определения наличия CSS-класса видимости
  //и задания адреса изображения в теге img
  return(
    cards.map((card)=>{
      return(
        <figure className="element" key={card._id}>
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
    })
  )

}


export default Card;
