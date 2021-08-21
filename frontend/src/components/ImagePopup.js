import React from 'react';

function ImagePopup({card, onClose, handleClickClose}) {
  return (
    <section className={`popup popup_style_opacity popup_type_mesto ${card.link ? 'popup_opened' : ''}`} onClick={handleClickClose}>
      <div className="popup__wrap">
        <figure className="popup__figure">
          <img src={card.link} alt={card.name} className="popup__image" />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
        <button className="popup__close-button" type="button" onClick={onClose}></button>
      </div>
    </section>
  );
}

export default ImagePopup;