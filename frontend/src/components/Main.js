import React from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards, userData, handleLogout }) {
  
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header>
        <p className="header__auth-email">{userData.email}</p>
        <button onClick={handleLogout} className="header__logout-link">Выйти</button>
      </Header>

      <div className="content">
        <section className="profile">
          <div className="profile__avatar-wrap">
            <div className="profile__avatar-overlay" onClick={onEditAvatar}></div>
            <img className="profile__avatar" src={currentUser.avatar} alt={currentUser.name} />
          </div>
          <div className="profile__info">
            <button className="profile__edit-button" onClick={onEditProfile} type="button"></button>
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__about">{currentUser.about}</p>
          </div>
          <button className="profile__add-button" onClick={onAddPlace} type="button"></button>
        </section>
          
        <section className="elements">
          {cards.map((item) => (<Card key={item._id} card={item} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />))}
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Main;
