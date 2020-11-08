import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import Footer from './Footer.js';

function App() {

  const [isEditProfilePopupOpen, setEditProfileClick] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlaceClick] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarClick] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState([]);
  const [isPicturePopupOpen, setPicturePopupOpened] = React.useState(false);

  function closeAllPopups() {
    setEditProfileClick(false);
    setAddPlaceClick(false);
    setEditAvatarClick(false);
    setPicturePopupOpened(false);
    setSelectedCard([]);
  }

  function handlePictureClick(card){
    setSelectedCard(card);
    setPicturePopupOpened(true);
  }

  return (
    <div className="page">
      <Header />
      <Main onEditProfile={() => { setEditProfileClick(true) }} onAddPlace={() => { setAddPlaceClick(true) }} onEditAvatar={() => { setEditAvatarClick(true) }} onCardPictureClick={handlePictureClick} />
      <Footer />
      <PopupWithForm title="Редактировать профиль" name="profile" buttonText="Сохранить" buttonDisabled={false} buttonClass="" isOpened={isEditProfilePopupOpen} onClose={closeAllPopups} >
        <label className="input__label">
          <input id="name-input" type="text" className="input__text input__text_type_name" placeholder="Имя" name="name" minLength="2" maxLength="40" required />
          <span id="name-input-error" className="input__field-error"></span>
        </label>
        <label className="input__label">
          <input id="profession-input" type="text" className="input__text input__text_type_profession" placeholder="Профессия" name="profession" minLength="2" maxLength="200" required />
          <span id="profession-input-error" className="input__field-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm title="Новое место" name="place" buttonText="Создать" buttonDisabled={true} buttonClass="input__btn_state_disabled" isOpened={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <label className="input__label">
          <input id="place-input" type="text" className="input__text input__text_type_place-title" placeholder="Название" name="place-title" minLength="1" maxLength="30" required />
          <span id="place-input-error" className="input__field-error"></span>
        </label>
        <label className="input__label">
          <input id="place-img-input" type="url" className="input__text input__text_type_place-img" placeholder="Ссылка на картинку" name="place-img" required />
          <span id="place-img-input-error" className="input__field-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm title="Вы уверены?" name="confirm" buttonText="Да" buttonDisabled={false} buttonClass="input__btn_type_alone" onClose={closeAllPopups} />
      <PopupWithForm title="Обновить аватар" name="avatar" buttonText="Сохранить" buttonDisabled={false} buttonClass="" isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <label className="input__label">
          <input id="avatar-input" type="url" className="input__text input__text_type_avatar" placeholder="Ссылка на картинку" name="avatar" required />
          <span id="avatar-input-error" className="input__field-error"></span>
        </label>
      </PopupWithForm>
      <ImagePopup card={selectedCard} isOpened={isPicturePopupOpen} onClose={closeAllPopups}/>
    </div>
  );
}

export default App;
