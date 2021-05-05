function Main() {
  let isClicked = false;
  function handleEditAvatarClick() {
    document.querySelector('.popup_avatar').classList.add('popup__flexed')
    document.querySelector('.popup_avatar').classList.add('popup_opened')
  }

  function handleEditProfileClick() {
    document.querySelector('.popup_change-profile').classList.add('popup__flexed')
    document.querySelector('.popup_change-profile').classList.add('popup_opened')
  }

  function handleAddPlaceClick() {
    document.querySelector('.popup_add-card').classList.add('popup__flexed')
    document.querySelector('.popup_add-card').classList.add('popup_opened')
  }
  return(
    <main className="content">
      <section className="profile page__section page__profile">
        <div className="profile__avatar avatar-form-open-button" onClick={handleEditAvatarClick}/>
        <div className="profile__info">
          <h1 className="profile__title" />
          <button className="profile__change-button page__button profile-form-open-button" onClick={handleEditProfileClick} type="button" aria-label="Кнопка Редактировать профиль" />
          <p className="profile__subtitle" />
        </div>
        <button className="profile__add-button page__button add-card-form-open-button" onClick={handleAddPlaceClick} type="button" aria-label="Кнопка Добавить карточку" />
      </section>
      <section className="elements page__section">
      </section>
    </main>
  )
}



export default Main;
