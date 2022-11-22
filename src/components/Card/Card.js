import React from 'react'
import './Card.scss'
function Card(props) {
  const { card } = props
  return (
    <div className="card">
      {card.cover && (
        <img
          className="card-cover"
          src={card.cover}
          alt="trello-img"
          onMouseDown={e => e.preventDefault()}
          //draggable="false" tuong tu nhu onMouseDown
          //link:"https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/draggable"
        />
      )}
      {card.title}
    </div>
  )
}

export default Card
