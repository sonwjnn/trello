import React from 'react'
import './Board.scss'
import BoardBar from 'components/BoardBar/BoardBar'
import BoardContent from 'components/BoardContent/BoardContent'
function Board() {
  return (
    <div className='board'>
      <BoardBar />
      <BoardContent />
    </div>
  )
}

export default Board
