import React from 'react';
import NavBar from './NavBar';
import logoPath from '../images/Mesto-logo.svg';

function Header({ setIsLoggedIn, email }) {
  return(
    <header className="header page__section page__header">
      <img className="logo" src={logoPath} alt="логотип Место" />
      <NavBar 
      setIsLoggedIn={setIsLoggedIn}
      email={email}/>
    </header>
  )
}

export default Header;
