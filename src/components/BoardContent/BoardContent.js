import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'

import './BoardContent.scss'
import BoardColumn from 'components/BoardColumn/BoardColumn'
import { initialData } from 'actions/initialData'
import { mapOrder } from 'utilities/sorts'
import { Container, Draggable } from 'react-smooth-dnd'

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
    // const scene = Object.assign({}, this.state.scene)
    // scene.children = applyDrag(scene.children, dropResult)
    // this.setState({
    //   scene
    // })
    console.log(dropResult)
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
            <BoardColumn column={column} />
          </Draggable>
        ))}
      </Container>
    </div>
  )
}

export default BoardContent
