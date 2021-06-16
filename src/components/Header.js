import React from 'react';
import { useMediaQuery } from 'react-responsive'
import HeaderContent from './HeaderContent';


function Header({ onSignOut, email }) {

  const isMobile = useMediaQuery({ query: '(max-width: 320px)' })
  const isDesktop = useMediaQuery({ query: '(min-width: 321px)' })

  //const [isExpandedNav, setIsExpandedNav] = React.useState(false);
  //console.log('консоль:isExpandedNav', isExpandedNav);

  return (
    <header className="header page__section page__animation page__header">
      <HeaderContent
        onSignOut={onSignOut}
        email={email} />
    </header>
  )
}

export default Header;
