import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'

import './BoardContent.scss'
import BoardColumn from 'components/BoardColumn/BoardColumn'
import { Container, Draggable } from 'react-smooth-dnd'
import { initialData } from 'actions/initialData'
import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'

function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])

  useEffect(() => {
    const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
    if (boardFromDB) {
      setBoard(boardFromDB)
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
    }
  }, [])

  if (isEmpty(board)) {
    return <div className="not-board">No Board Content!</div>
  }

  const onColumnDrop = dropResult => {
    let newColumns = [...columns]
    let newBoard = { ...board }

    newColumns = applyDrag(newColumns, dropResult)
    newBoard.columnOrder = newColumns.map(col => col.id)
    newBoard.columns = newColumns

    setBoard(newBoard)
    setColumns(newColumns)
  }

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex != null || dropResult.addedIndex != null) {
      let newColumns = [...columns]
      let currentColumn = newColumns.find(col => col.id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = newColumns.map(card => card.id)
      setColumns(newColumns)
    }
  }

  return (
    <div className="board-content">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={index => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'board-column-drop-preview'
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <BoardColumn column={column} onCardDrop={onCardDrop} />
          </Draggable>
        ))}
      </Container>
      <div className="add-new-column">
        <i className="fa fa-plus icon"></i>Add another column
      </div>
    </div>
  )
}

export default BoardContent
