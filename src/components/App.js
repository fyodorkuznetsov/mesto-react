import React from 'react';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import apiInstance from '../utils/Api';

function App() {

  const [isEditProfilePopupOpen, setEditProfileClick] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlaceClick] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarClick] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [isPicturePopupOpen, setPicturePopupOpened] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({ name: 'Chuck Testa', avatar: 'https://i.ytimg.com/vi/LJP1DphOWPs/hqdefault.jpg', about: 'American Taxidermist' });

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    apiInstance.getInitialCards().then((res) => {
      setCards(res);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  React.useEffect(() => {
    apiInstance.getUserInfo()
      .then((res) => { setCurrentUser(res); })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    apiInstance.likeAction(card._id, isLiked ? 'DELETE' : 'PUT').then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    apiInstance.removeCard(card._id).then((newCard) => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setEditProfileClick(false);
    setAddPlaceClick(false);
    setEditAvatarClick(false);
    setPicturePopupOpened(false);
    setSelectedCard({});
  }

  function handlePictureClick(card) {
    setSelectedCard(card);
    setPicturePopupOpened(true);
  }

  function handleUpdateUser(userData) {
    apiInstance.updateUserProfile(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(userData) {
    apiInstance.updateUserAvatar(userData.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    apiInstance.addNewCard(newCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main cards={cards} onCardDelete={handleCardDelete} onCardLike={handleCardLike} onEditProfile={() => { setEditProfileClick(true) }} onAddPlace={() => { setAddPlaceClick(true) }} onEditAvatar={() => { setEditAvatarClick(true) }} onCardPictureClick={handlePictureClick} />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <PopupWithForm title="Вы уверены?" name="confirm" buttonText="Да" buttonDisabled={false} buttonClass="input__btn_type_alone" onClose={closeAllPopups} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup card={selectedCard} isOpened={isPicturePopupOpen} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
