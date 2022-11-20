import React from 'react'
import './BoardContent.scss'
import BoardItem from 'components/BoardItem/BoardItem'

function BoardContent() {
  return (
    <div className="board-content">
      <BoardItem />
      <BoardItem />
      <BoardItem />
    </div>
  )
}

export default BoardContent
