function PopupWithForm(props) {
  //Кроме заголовка и идентификатора в компонент PopupWithForm
  //будет передаваться вложенное содержимое в виде JSX-разметки,
  //отличающейся для всех четырёх попапов.
  //Внутри самого компонента оно будет доступно через специальный пропс children,
  //который также должен быть подставлен в нужном месте в JSX.
  return(
    <div className={`popup popup_${props.name}`} >
     <div className={`popup__container popup__container_form popup__container_${props.name}`}>
       <button className={`popup__button-close popup__button-close_${props.name} page__button`} aria-label="Кнопка Закрыть форму" type="button" />
       //name - в названии формы. потом переделать с кнокой открытия
       <form className="popup__form" action="#" method="POST" name={`${props.name}-form`} noValidate autoComplete="off">
         <h2 className="popup__heading">
           {props.title}
         </h2>
        {props.children}
         <button className={`popup__button-save popup__button-save_${props.name} page__button`} type="submit" value="Отправить на сервер" aria-label="Кнопка Сохранить форму">
           Сохранить
         </button>
       </form>
     </div>
    </div>
  )
}

export default PopupWithForm;
