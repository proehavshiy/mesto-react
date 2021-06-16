import React from 'react';

function MobileNavBar({ expandNav }) {
  const [menuButton, setMenuButton] = React.useState(false);

  function openMenu() {
    setMenuButton(true)
    expandNav(true)

  }
  function closeMenu() {

    setMenuButton(false)
    expandNav(false)
  }

  return (
    !menuButton ? (
      <>
        <div className="page__button header__button" onClick={openMenu}>
          <div className='header__button header__button_burger'></div>
          <div className='header__button header__button_burger'></div>
          <div className='header__button header__button_burger'></div>
        </div>
      </>
    ) : (
      <>
        <button className="page__button page__button_type_close" onClick={closeMenu} aria-label="Кнопка Закрыть меню" type="button"></button>
      </>
    )
  );
}

export default MobileNavBar;
