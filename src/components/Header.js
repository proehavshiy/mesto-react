import React from 'react';
import NavBar from './NavBar';
import logoPath from '../images/Mesto-logo.svg';

function Header({ onSignOut, email, loggedIn }) {
  return (
    <header className="header page__section page__animation page__animation page__header">
      <img className="logo" src={logoPath} alt="логотип Место" />
      <NavBar
        onSignOut={onSignOut}
        email={email}
        loggedIn={loggedIn} />
    </header>
  )
}

export default Header;
