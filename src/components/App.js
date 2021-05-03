import Header from './header/Header'
import Main from './main/Main'
import Footer from './footer/Footer'

function App() {
  return (
    <div className="App">
      <div className="page">
       <Header/>
       <Main />
       <Footer />
       <div className="popup popup_change-profile">
         <div className="popup__container popup__container_form popup__container_change-profile">
           <button className="popup__button-close popup__button-close_change-profile page__button" aria-label="Кнопка Закрыть форму" type="button" />
           <form className="popup__form" action="#" method="POST" name="profile-form" noValidate autoComplete="off">
             <h2 className="popup__heading">
               Редактировать профиль
             </h2>
             <fieldset className="popup__profile-information">
               <section className="popup__input-section">
                 <input className="popup__input popup__input_profile-name" type="text" name="profile-name" defaultValue placeholder="Имя" required minLength={2} maxLength={40} />
                 <span className="popup__input-error popup__input-error_type_profile-name" />
               </section>
               <section className="popup__input-section">
                 <input className="popup__input popup__input_profile-signing" type="text" name="profile-signing" defaultValue placeholder="Подпись" required minLength={2} maxLength={200} />
                 <span className="popup__input-error popup__input-error_type_profile-signing" />
               </section>
             </fieldset>
             <button className="popup__button-save popup__button-save_change-profile page__button" type="submit" value="Отправить на сервер" aria-label="Кнопка Сохранить форму">
               Сохранить
             </button>
           </form>
         </div>
       </div>
       <div className="popup popup_add-card">
         <div className="popup__container popup__container_form popup__container_add-card">
           <button className="popup__button-close popup__button-close_add-card page__button" aria-label="Кнопка Закрыть форму" type="button" />
           <form className="popup__form" action="#" method="POST" name="new-card-form" noValidate autoComplete="off">
             <h2 className="popup__heading">
               Новое место
             </h2>
             <fieldset className="popup__profile-information">
               <section className="popup__input-section">
                 <input className="popup__input popup__input_location-name" type="text" name="location-name" defaultValue placeholder="Название" required minLength={2} maxLength={30} />
                 <span className="popup__input-error popup__input-error_type_location-name" />
               </section>
               <section className="popup__input-section">
                 <input className="popup__input popup__input_image-link" type="url" name="image-link" defaultValue placeholder="Ссылка на картинку" required />
                 <span className="popup__input-error popup__input-error_type_image-link" />
               </section>
             </fieldset>
             <button className="popup__button-save popup__button-save_add-card page__button" type="submit" value="Отправить на сервер" aria-label="Кнопка Создать">
               Создать
             </button>
           </form>
         </div>
       </div>
       <div className="popup popup_confirm-deletion">
         <div className="popup__container popup__container_form popup__container_confirm-deletion">
           <button className="popup__button-close popup__button-close_change-profile page__button" aria-label="Кнопка Закрыть форму" type="button" />
           <form className="popup__form" action="#" method="POST" name="confirm-deletion-form" noValidate autoComplete="off">
             <h2 className="popup__heading">
               Вы уверены?
             </h2>
             <button className="popup__button-save popup__button-save_confirm-deletion page__button" type="submit" value="Кнопка подтвердить удаление" aria-label="Кнопка Сохранить форму">
               Да
             </button>
           </form>
         </div>
       </div>
       <div className="popup popup_avatar">
         <div className="popup__container popup__container_form popup__container_avatar">
           <button className="popup__button-close popup__button-close_avatar page__button" aria-label="Кнопка Закрыть форму" type="button" />
           <form className="popup__form" action="#" method="POST" name="avatar-form" noValidate autoComplete="off">
             <h2 className="popup__heading">
               Обновить аватар
             </h2>
             <fieldset className="popup__profile-information">
               <section className="popup__input-section">
                 <input className="popup__input popup__input_image-link" type="url" name="image-link" defaultValue placeholder="Ссылка на картинку" required />
                 <span className="popup__input-error popup__input-error_type_image-link" />
               </section>
             </fieldset>
             <button className="popup__button-save popup__button-save_avatar page__button" type="submit" value="Отправить на сервер" aria-label="Кнопка Создать">
               Сохранить
             </button>
           </form>
         </div>
       </div>
       <div className="popup popup_open-image">
         <div className="popup__container popup__container_open-image">
           <button className="popup__button-close popup__button-close_open-image page__button" type="button" aria-label="закрыть изображение" />
           <figure className="popup__figure">
             <img className="popup__image" src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg" alt="Архыз" />
             <figcaption className="popup__figcaption" />
           </figure>
         </div>
       </div>
      </div>
    </div>
  );
}

export default App;
