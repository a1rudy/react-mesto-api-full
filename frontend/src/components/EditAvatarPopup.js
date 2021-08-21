import React from 'react';
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({ isOpen, onClose, handleClickClose, onUpdateAvatar }) {

  const inputRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
  
    onUpdateAvatar({
      avatar: inputRef.current.value,
    }, () => {inputRef.current.value = ''})
  }

  return (
    <PopupWithForm  isOpen={isOpen} title={'Обновить аватар'} name={'avatar'} buttonText={'Сохранить'} handleClickClose={handleClickClose} onSubmit={handleSubmit} onClose={onClose}>
      <div className="popup__form-wrap popup__form-wrap_type_avatar">
        <input className="popup__input" ref={inputRef} id="input-link" type="url" placeholder="Ссылка на аватарку" name="avatar" required />
        <span className="popup__input-error input-link-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;