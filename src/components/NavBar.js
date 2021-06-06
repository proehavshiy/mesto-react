import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function NavBar({ onSignOut, email} ) {
    const location = useLocation();

    return (
      <nav className="header__navBar">
          {
            //в зависимости от текущей страницы отображаем нужные поля
            (location.pathname === '/sign-in' && <NavLink className="header__link page__button" to="/sign-up">Регистрация</NavLink>) ||
            (location.pathname === '/sign-up' && <NavLink className="header__link page__button" to="/sign-in">Войти</NavLink>) ||
            (location.pathname === '/' && 
            <>
                <p className="header__email">{email}</p>
                <button className="header__link header__button page__button" onClick={onSignOut}>Выйти</button>
            </>
            )   
          }
      </nav>
    );
  }

  export default NavBar;

  /*
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