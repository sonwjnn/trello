import React from 'react'
import './BoardItem.scss'
import Card from 'components/Card/Card'
import { mapOrder } from 'utilities/sorts'
function BoardItem(props) {
  const { item } = props
  const cards = mapOrder(item.cards, item.cardOrder, 'id')

  return (
    <div className="board-item">
      <header>{item.title}</header>
      <ul className="cards">
        {cards.map((card, index) => (
          <Card card={card} key={index} />
        ))}
      </ul>
      <footer>Footer</footer>
    </div>
  )
}

export default BoardItem
