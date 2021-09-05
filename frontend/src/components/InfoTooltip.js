import React from 'react';
import notifySuccess from '../images/popup/popup__notify-success.png'
import notifyFailed from '../images/popup/popup__notify-failed.png'

const ICONS = {
  success: notifySuccess,
  error: notifyFailed
}

function InfoTooltip({ isOpen, onClose, status: {iconType, text} = {} }) {
  return (
    <section className={`popup popup_style_opacity popup_type_tooltip ${isOpen ? 'popup_opened' : ''}`} >
      <div className="popup__container popup__container_type_tooltip">
        <img className="popup__notify-success" alt={text} src={ICONS[iconType]}></img>
        <h2 className="popup__notify-title">{text}</h2>
        <button className="popup__close-button popup__close-button_type_tooltip" type="button" onClick={onClose}></button>
      </div>
    </section>
  );
}

export default InfoTooltip;