import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupConfirmDeletion() {
  return(
    <PopupWithForm
      name="confirm-deletion"
      title="Вы уверены?"
      submitText="Да"/>
  )
}

export default PopupConfirmDeletion;
