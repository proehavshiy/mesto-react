import React from 'react';
import logoPath from '../images/Mesto-logo.svg';

function Header() {
  return(
    <header className="header page__section page__header">
      <img className="logo" src={logoPath} alt="логотип Место" />
    </header>
  )
}

export default Header;
