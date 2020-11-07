import React from 'react';

function Card(props) {

  function handleClick() {
    props.onPictureClick(props.card);
  }

  return (
    <article className="places__place">
      <figure className="places__picture-wrap">
        <img src={props.card.link} alt={props.card.name} className="places__picture" onClick={handleClick}/>
      </figure>
      <div className="places__title-wrap">
        <h2 className="places__title">{props.card.name}</h2>
        <div className="places__like">
          <button type="button" className="places__like-btn"></button>
          <p className="places__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
      <button type="button" className="places__remove"></button>
    </article>
  );
}

export default Card;
