import React from 'react';

function ExpandedNav({ onSignOut, email }) {
  return (
    <div className='header__expanded-nav page__animation'>
      <p className="header__email">{email}</p>
      <button className="header__link header__button header__button_logout page__button" onClick={onSignOut}>Выйти</button>
    </div>
  );
}

export default ExpandedNav;
