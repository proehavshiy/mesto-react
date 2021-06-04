import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';

function NavBar({ setIsLoggedIn, email} ) {
    const history = useHistory();
    const location = useLocation();

    //слушатель для кнопки выхода
    function signOut(){
        localStorage.removeItem('jwt');//удаляем токен
        setIsLoggedIn(false);//стейт - разлогиниваем
        history.push('/sign-in');//переход на страницу логина
    }

    return (
      <nav className="header__navBar">
          {
            //в зависимости от текущей страницы отображаем нужные поля
            (location.pathname === '/sign-in' && <NavLink className="header__link page__button" to="/sign-up">Регистрация</NavLink>) ||
            (location.pathname === '/sign-up' && <NavLink className="header__link page__button" to="/sign-in">Войти</NavLink>) ||
            (location.pathname === '/' && 
            <>
                <p className="header__email">{email}</p>
                <button className="header__link header__button page__button" onClick={signOut}>Выйти</button>
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