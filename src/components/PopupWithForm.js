import React from 'react';

function PopupWithForm(props) {

  const popupClass = `popup popup_type_${props.name}${props.isOpened ? ' popup_state_opened' : ''}`;

  return (
    <section className={popupClass}>
      <div className="popup__container">
        <h3 className="popup__title">{props.title}</h3>
        <form className={`input input_type_${props.name}`} action="#" name={props.name} encType="multipart/form-data" method="POST" noValidate>
          {props.children}
        </form>
        <button type="button" className="popup__close-btn" onClick={props.onClose}></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
