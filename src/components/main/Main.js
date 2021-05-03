function Main() {
  return(
    <main className="content">
      <section className="profile page__section page__profile">
        <div className="profile__avatar avatar-form-open-button" />
        <div className="profile__info">
          <h1 className="profile__title" />
          <button className="profile__change-button page__button profile-form-open-button" type="button" aria-label="Кнопка Редактировать профиль" />
          <p className="profile__subtitle" />
        </div>
        <button className="profile__add-button page__button new-card-form-open-button" type="button" aria-label="Кнопка Добавить карточку" />
      </section>
      <section className="elements page__section">
      </section>
    </main>
  )
}

export default Main;
