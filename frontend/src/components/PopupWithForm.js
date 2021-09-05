import React from 'react';

function PopupWithForm({ isOpen, title, name, buttonText, onClose, onSubmit, children }) {

  return (
      <section className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} >
        <div className="popup__container">
          <h2 className="popup__title">{title}</h2>
          <form className={`popup__form popup__form_type_${name}`} onSubmit={onSubmit} name={`popup_form_${name}`}>
            {children}
            <button className="popup__save-button save-button" type="submit"><span className="popup__button-span">{buttonText}</span></button>
          </form>
          <button className="popup__close-button" type="button" onClick={onClose}></button>
        </div>
      </section>
  )
}

export default PopupWithForm;