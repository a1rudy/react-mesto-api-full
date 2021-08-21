import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn ? 'element__delete-button_active' : ''}`
  );
  const cardLikeButtonClassName = (
    `element__like-button ${isLiked ? 'element__like-button_active' : ''}`
  ); 

  function handleClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleDelete() {
    onCardDelete(card);
  }

  return (
    <article className="element">
      <div className="element__img-wrap">
        <img className="element__image" src={card.link} alt={`Это ${card.name}? Не похоже) Введите корректную ссылку.`} onClick={handleClick}/>
      </div>
      <button className={cardDeleteButtonClassName} onClick={handleDelete} type="button"></button>
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like_ui">
          <button className={cardLikeButtonClassName} onClick={handleLike} type="button"></button>
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;