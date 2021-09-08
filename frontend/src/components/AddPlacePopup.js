import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormWithValidation } from "../hooks/useFormWithValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isSending }) {

  const {values, handleChange, resetForm, errors, isValid} = useFormWithValidation();

  React.useEffect(() => {
    resetForm({});
  }, [isOpen, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    isValid &&
      onAddPlace(values);
  }
  
  return (
    <PopupWithForm isOpen={isOpen} title={'Новое место'} name={'mesto'} buttonText={isSending ? 'Создание...' : 'Создать'} isDisabled={!isValid || isSending} onSubmit={handleSubmit} onClose={onClose} >
      <div className="popup__form-wrap">
        <input className="popup__input popup__input_type_top" onChange={handleChange} value={values.name || ''} id="title-input" type="text" placeholder="Название" name="name" minLength="2" maxLength="30" required />
        <span className="popup__input-error title-input-error">{errors.name || ''}</span>
      </div>
      <div className="popup__form-wrap">
        <input className="popup__input popup__input_type_bottom" onChange={handleChange} value={values.link || ''} id="link-input" type="url" placeholder="Ссылка на картинку" name="link" required />
        <span className="popup__input-error link-input-error">{errors.link || ''}</span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;