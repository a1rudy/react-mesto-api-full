import React from 'react';
import notifySuccess from '../images/popup/popup__notify-success.png'
import notifyFailed from '../images/popup/popup__notify-failed.png'

function InfoTooltip({isOpen, onClose, handleClickClose, loggedIn}) {
  return (
    <section className={`popup popup_style_opacity popup_type_tooltip ${isOpen ? 'popup_opened' : ''}`} onClick={handleClickClose}>
      <div className="popup__container popup__container_type_tooltip">
        <img className="popup__notify-success" src={loggedIn ? notifySuccess : notifyFailed}></img>
        <h2 className="popup__notify-title">{loggedIn ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
        <button className="popup__close-button popup__close-button_type_tooltip" type="button" onClick={onClose}></button>
      </div>
    </section>
  );
}

export default InfoTooltip;