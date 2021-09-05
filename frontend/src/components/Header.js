import React from "react";
import logoPath from "../images/header/header__logo.svg";
import { Route, Link, Switch, useRouteMatch } from "react-router-dom";

function Header({ onSignOut, email }) {
  const [isMenuOpen, setMenuOpen] = React.useState(false);

  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }

  const isMain = useRouteMatch({path: "/main", exact: true});

  return (
    <header className={`header ${isMenuOpen ? "header_menu-open" : ""} ${isMain ? "header_page-main" : ""}`}>
      <img className='header__logo' src={logoPath} alt='Логотип проекта Mesto' />
      <Switch>
        <Route exact path='/main'>
          <button className='header__burger' type='button' aria-label='меню' onClick={toggleMenu}></button>
          <div className='header__auth-container'>
            <p className='header__auth-email'>{email}</p>
            <button className='header__logout-link' onClick={onSignOut}>Выйти</button>
          </div>
        </Route>
        <Route path='/signup'>
          <Link className='header__login-link' to='signin'>Войти</Link>
        </Route>
        <Route path='/signin'>
          <Link className='header__login-link' to='signup'>Регистрация</Link>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;