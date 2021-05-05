import Card from './Card'
function Main({onEditProfile, onAddPlace, onEditAvatar, userName, userDescription, userAvatar, cards}) {
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
        <Card cards={cards}/>
      </section>
    </main>
  )
}
export default Main;
