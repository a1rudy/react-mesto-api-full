import React from 'react';
import PopupWithForm from './PopupWithForm'

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  
  const [namePlace, setNamePlace] = React.useState('');
  const [linkPlace, setLinkPlace] = React.useState('');

  function handleChangeNamePlace(evt) {
    setNamePlace(evt.target.value);
  }

  function handleChangeLinkPlace(evt) {
    setLinkPlace(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: namePlace,
      link: linkPlace,
    }, () => {
      setNamePlace('');
      setLinkPlace('');
    });
  }
  
  return (
    <PopupWithForm isOpen={isOpen} title={'Новое место'} name={'mesto'} buttonText={'Создать'} onSubmit={handleSubmit} onClose={onClose}>
      <div className="popup__form-wrap">
        <input className="popup__input popup__input_type_top" onChange={handleChangeNamePlace} value={namePlace} id="title-input" type="text" placeholder="Название" name="name" minLength="2" maxLength="30" required />
        <span className="popup__input-error title-input-error"></span>
      </div>
      <div className="popup__form-wrap">
        <input className="popup__input popup__input_type_bottom" onChange={handleChangeLinkPlace} value={linkPlace} id="link-input" type="url" placeholder="Ссылка на картинку" name="link" required />
        <span className="popup__input-error link-input-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;