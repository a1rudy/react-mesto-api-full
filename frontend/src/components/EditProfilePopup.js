import React from 'react';
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormWithValidation } from "../hooks/useFormWithValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSending }) {

  const currentUser = React.useContext(CurrentUserContext);

  const {values, handleChange, resetForm, errors, isValid} = useFormWithValidation();
  
  React.useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [isOpen, currentUser, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    isValid &&
      onUpdateUser(values);
  }

  return(
    <PopupWithForm isOpen={isOpen} title={'Редактировать профиль'} name={'profile'} buttonText={isSending ? 'Сохранение...' : 'Сохранить'} isDisabled={!isValid || isSending} onSubmit={handleSubmit} onClose={onClose} >
      <div className="popup__form-wrap">
        <input className="popup__input popup__input_type_top" onChange={handleChange} value={values.name || ''} id="name-input" type="text" placeholder="Имя" name="name" minLength="2" maxLength="40" required />
        <span className="popup__input-error name-input-error">{errors.name || ''}</span>
      </div>
      <div className="popup__form-wrap">
        <input className="popup__input popup__input_type_bottom" onChange={handleChange} value={values.about || ''} id="about-input" type="text" placeholder="О себе" name="about" minLength="2" maxLength="200" required />
        <span className="popup__input-error about-input-error">{errors.about || ''}</span>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup;