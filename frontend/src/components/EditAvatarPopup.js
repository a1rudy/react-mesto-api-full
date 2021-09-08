import React from 'react';
import PopupWithForm from './PopupWithForm'
import { useFormWithValidation } from "../hooks/useFormWithValidation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isSending }) {

  const {values, handleChange, resetForm, errors, isValid} = useFormWithValidation();

  React.useEffect(() => {
    resetForm({});
  }, [isOpen, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    isValid &&
      onUpdateAvatar(values);
  }

  return (
    <PopupWithForm  isOpen={isOpen} title='Обновить аватар' name='avatar' buttonText={isSending ? 'Сохранение...' : 'Сохранить'} isDisabled={!isValid || isSending} onSubmit={handleSubmit} onClose={onClose} >
      <div className="popup__form-wrap popup__form-wrap_type_avatar">
        <input className="popup__input" value={values.avatar || ''} onChange={handleChange} id="input-link" type="url" placeholder="Ссылка на аватарку" name="avatar" required />
        <span className="popup__input-error input-link-error">{errors.avatar || ''}</span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;