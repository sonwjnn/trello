import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'

import './BoardContent.scss'
import BoardItem from 'components/BoardItem/BoardItem'
import { initialData } from 'actions/initialData'
import { mapOrder } from 'utilities/sorts'
function BoardContent() {
  const [board, setBoard] = useState({})
  const [items, setItems] = useState([])
  useEffect(() => {
    const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
    if (boardFromDB) {
      setBoard(boardFromDB)
      setItems(mapOrder(boardFromDB.items, boardFromDB.itemOrder, 'id'))
    }
  }, [])

  if (isEmpty(board)) {
    return <div className="not-board">No Board Content!</div>
  }

  return (
    <div className="board-content">
      {items.map((item, index) => (
        <BoardItem item={item} key={index} />
      ))}
    </div>
  )
}

export default BoardContent
