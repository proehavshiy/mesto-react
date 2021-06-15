import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function NavBar({ onSignOut, email }) {
  const location = useLocation();

  function handleMobileButton() {

  }

  //в зависимости от текущей страницы и статуса логина отображаем нужные поля
  return (
    <nav className="header__navBar">
      {
        (location.pathname === '/' &&
          <>
            <div className="header__link header__button page__button" onClick={handleMobileButton}>
              <div className='header__button_burger'></div>
              <div className='header__button_burger'></div>
              <div className='header__button_burger'></div>
            </div>
          </>
        ) ||

        (location.pathname === '/sign-in' && <NavLink className="header__link page__button" to="/sign-up">Регистрация</NavLink>) ||
        (location.pathname === '/sign-up' && <NavLink className="header__link page__button" to="/sign-in">Войти</NavLink>)



      }
    </nav>
  );
}

export default NavBar;

/*


(location.pathname === '/' &&
          <>
            <p className="header__email">{email}</p>
            <button className="header__link header__button header__button_logout page__button" onClick={onSignOut}>Выйти</button>
          </>
        ) ||


{!loggedIn? (
            //в зависимости от текущей страницы отображаем нужную ссылку
            location.pathname === '/sign-in' && <NavLink className="header__link page__button" to="/sign-up">Регистрация</NavLink> ||
            location.pathname === '/sign-up' && <NavLink className="header__link page__button" to="/sign-in">Войти</NavLink>

        ):(
          <>
              <p className="header__email">{email}</p>
              <button className="header__link header__button page__button" onClick={signOut}>Выйти</button>
          </>
        )}
*/
