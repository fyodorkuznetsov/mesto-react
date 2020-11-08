import React from 'react';
import apiInsance from '../utils/Api.js';
import Card from './Card.js';

function Main(props) {

  const [userName, setUserName] = React.useState('Chuck Testa');
  const [userDescription, setUserDescription] = React.useState('American taxidermist');
  const [userAvatar, setUserAvatar] = React.useState('https://i.imgflip.com/1kpg18.jpg');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    apiInsance.getUserInfo().then((res) => {
      setUserName(res.name);
      setUserDescription(res.about);
      setUserAvatar(res.avatar);
    }).catch((err) => {
      console.log(err);
    });

    apiInsance.getInitialCards().then((res) => {
      setCards(res);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <figure className="profile__avatar-wrap">
          <img className="profile__avatar" src={userAvatar} alt="Аватар профиля" />
          <button className="profile__avatar-btn" aria-label="Редактировать аватар" onClick={props.onEditAvatar}></button>
        </figure>
        <div className="profile__info">
          <div className="profile__name-wrap">
            <h1 className="profile__name">{userName}</h1>
            <button type="button" className="profile__edit-button" aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__profession">{userDescription}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace}>+</button>
      </section>
      <section className="places">
          {cards.map((card, i) => (
            <Card key={i} card={card} onPictureClick={props.onCardPictureClick}/>
          ))}
      </section>
    </main>
  );
}

export default Main;
