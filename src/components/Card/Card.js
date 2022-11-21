import React from 'react'
import './Card.scss'
function Card(props) {
  const { card } = props
  return (
    <li className="card">
      {card.cover && (
        <img className="card-cover" src={card.cover} alt="trello-img" />
      )}
      {card.title}
    </li>
  )
}

export default Card
