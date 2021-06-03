import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function NavBar({ loggedIn, setIsLoggedIn, email} ) {
    const history = useHistory();
    function signOut(){
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
        history.push('/sign-in');
    }

    return (
      <nav className="header__navBar">
          {!loggedIn? (
            <>
                <NavLink className="header__link page__button" to="/sign-in">Войти</NavLink>
                <NavLink className="header__link page__button" to="/sign-up">Регистрация</NavLink>
            </>
          ):(
            <>
                <p className="header__email">{email}</p>
                <button className="header__link header__button page__button" onClick={signOut}>Выйти</button>
            </>
          )}
        
        
      </nav>
    );
  }

  export default NavBar;