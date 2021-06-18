import React from 'react';
import PageWithForm from './PageWithForm';

function Login({ onLogin, isSubmitting }) {
  const [input, setInput] = React.useState({});

  const theme = 'dark';

  const submitButtonState = !input.email || !input.password || !input.email.valid || !input.password.valid ? false : true;
  const submitButtonText = isSubmitting ? 'Войти' : 'Вход...';

  const inputEmailErrorClass = !input.email || input.email.errorMessage ? 'form__input_error' : '';
  const inputEmailErrorCaption = !input.email || input.email.errorMessage ? 'form__input-error_active' : '';
  const emailErrorMessage = input.email && input.email.errorMessage;

  const inputPasswordErrorClass = !input.password || input.password.errorMessage ? 'form__input_error' : '';
  const inputPasswordErrorCaption = !input.password || input.password.errorMessage ? 'form__input-error_active' : '';
  const passwordErrorMessage = input.password && input.password.errorMessage;

  //обработчик инпутов
  function handleLoginInput({ target }) {
    const { name, value, validity: { valid }, validationMessage } = target;

    setInput(prevState => ({
      ...prevState,
      [name]: {
        value,
        valid,
        errorMessage: validationMessage
      }
    })
    )
  }

  //обработчик формы
  function handleSubmit(evt) {
    evt.preventDefault();

    if (!input.email.value || !input.password.value) {
      return
    }

    onLogin(input.email.value, input.password.value)
  }

  return (
    <PageWithForm
      name="login"
      title="Вход"
      submitText={submitButtonText}
      onSubmit={handleSubmit}
      submitButtonState={submitButtonState}
      isRegister={false}
      theme={theme}>
      <fieldset className="form__profile-information form__profile-information_margin">
        <section className="form__input-section">
          <input className={`form__input form__input_theme_${theme} form__input_email ${inputEmailErrorClass}`} value={input.email ? input.email.value : ''} onChange={handleLoginInput} type="email" name="email" placeholder="Email" required minLength={6} maxLength={30} />
          <span className={`form__input-error form__input-error_type_email ${inputEmailErrorCaption}`}>
            {emailErrorMessage}
          </span>
        </section>
        <section className="form__input-section">
          <input className={`form__input form__input_theme_${theme} form__input_password ${inputPasswordErrorClass}`} value={input.password ? input.password.value : ''} onChange={handleLoginInput} type="password" name="password" placeholder="Пароль" required minLength={6} />
          <span className={`form__input-error form__input-error_type_password ${inputPasswordErrorCaption}`}>
            {passwordErrorMessage}
          </span>
        </section>
      </fieldset>
    </PageWithForm>
  )
}

export default Login;



/*
return(
    <AuthWithForm
      name="login"
      title="Вход"
      submitText={submitButtonText}
      onSubmit={handleSubmit}
      submitButtonState={submitButtonState}
      isRegister={false}>
      <fieldset className="form__profile-information">
        <section className="form__input-section">
          <input className={`form__input form__input_email ${inputEmailErrorClass}`} value={inputEmail.value || ''} onChange={handleLoginInput} type="email" name="email"  placeholder="Email" required minLength={6} maxLength={30} />
          <span className={`form__input-error form__input-error_type_email ${inputEmailErrorCaption}`}>
            {inputEmail.errorMessage}
          </span>
        </section>
        <section className="form__input-section">
          <input className={`form__input form__input_password ${inputPasswordErrorClass}`} value={inputPassword.value || ''} onChange={handleLoginInput} type="password" name="password"  placeholder="Пароль" required minLength={6} />
          <span className={`form__input-error form__input-error_type_password ${inputPasswordErrorCaption}`}>
          {inputPassword.errorMessage}
          </span>
        </section>
      </fieldset>
      </AuthWithForm>
  )
}

*/
