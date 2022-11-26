import React, { useState, useEffect, useRef, useCallback } from 'react'
import { isEmpty } from 'lodash'

import './BoardContent.scss'
import BoardColumn from 'components/BoardColumn/BoardColumn'
import { Container, Draggable } from 'react-smooth-dnd'
import { initialData } from 'actions/initialData'
import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'
import {
  Col,
  Row,
  Container as BootstrapContainer,
  Form,
  Button
} from 'react-bootstrap'

function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  const [openNewColumn, setOpenNewColumn] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const newColumnInputRef = useRef(null)

  const onNewColumnTitleChange = useCallback(
    e => setNewColumnTitle(e.target.value),
    []
  )

  useEffect(() => {
    const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
    if (boardFromDB) {
      setBoard(boardFromDB)
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
    }
  }, [])

  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus()
      newColumnInputRef.current.select()
    }
  }, [openNewColumn])

  const toggleNewColumnForm = () => {
    setOpenNewColumn(!openNewColumn)
  }
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

  const addNewColumn = () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus()
      return
    }
    const newComlum = {
      title: newColumnTitle.trim(),
      boardId: board.id,
      id: Math.random().toString(36).substring(2, 5),
      cardOrder: [],
      cards: []
    }

    let newColumns = [...columns]
    newColumns.push(newComlum)

    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(col => col.id)
    newBoard.columns = newColumns

    setBoard(newBoard)
    setColumns(newColumns)
    setNewColumnTitle('')
    toggleNewColumnForm()
  }

  const onColumnUpdate = newColumnToUpdate => {
    const columnIdToUpdate = newColumnToUpdate.id
    let newColumns = [...columns]
    const columnIndexToUpdate = newColumns.findIndex(
      item => item.id === columnIdToUpdate
    )

    if (newColumnToUpdate._destroy) {
      newColumns.splice(columnIndexToUpdate, 1)
    } else {
      newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)
    }

    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(col => col.id)
    newBoard.columns = newColumns

    setBoard(newBoard)
    setColumns(newColumns)
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
            <BoardColumn
              column={column}
              onCardDrop={onCardDrop}
              onColumnUpdate={onColumnUpdate}
            />
          </Draggable>
        ))}
      </Container>
      <BootstrapContainer className="bootstrap-container">
        {!openNewColumn && (
          <Row>
            <Col className="add-new-column" onClick={toggleNewColumnForm}>
              <i className="fa fa-plus icon"></i>Add another column
            </Col>
          </Row>
        )}
        {openNewColumn && (
          <Row>
            <Col className="enter-new-column">
              <Form.Control
                size="sm"
                type="email"
                placeholder="Enter column title..."
                className="input-enter-new-column"
                ref={newColumnInputRef}
                onChange={onNewColumnTitleChange}
                // onBlur={toggleNewColumnForm}
                value={newColumnTitle}
              />
              <Button
                className="add-new-col success"
                variant="success"
                size="sm"
                onClick={addNewColumn}
              >
                Add list
              </Button>
              <span onClick={toggleNewColumnForm} className="cancle-new-column">
                <i className="fa fa-trash icon" />
              </span>
            </Col>
          </Row>
        )}
      </BootstrapContainer>
    </div>
  )
}

export default BoardContent
