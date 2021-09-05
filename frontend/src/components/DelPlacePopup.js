import React from 'react';
import PopupWithForm from './PopupWithForm'

function DelPlacePopup({ isOpen, onClose, onDelPlace }) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onDelPlace();
  }

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} title={'Вы уверены?'} name="delete" buttonText={'Да'}/>
  )
}

export default DelPlacePopup;