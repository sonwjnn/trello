import React, { useState, useEffect, useRef } from 'react'
import { isEmpty, cloneDeep } from 'lodash'
import { flushSync } from 'react-dom'

import './BoardContent.scss'
import BoardColumn from 'components/BoardColumn/BoardColumn'
import { Container, Draggable } from 'react-smooth-dnd'
import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'
import { Col, Row, Container as BootstrapContainer, Form, Button } from 'react-bootstrap'

import { createNewColumn, fetchBoardDetails, updateBoard, updateColumn, updateCard } from 'actions/ApiCall'

function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  const [openNewColumn, setOpenNewColumn] = useState(false)

  const [newColumnTitle, setNewColumnTitle] = useState('')
  const toggleNewColumnForm = () => setOpenNewColumn(!openNewColumn)

  const newColumnInputRef = useRef(null)

  const onNewColumnTitleChange = (e) => setNewColumnTitle(e.target.value)

  useEffect(() => {
    const boardId = '63947713d29ca6b4b5647768'
    fetchBoardDetails(boardId).then((board) => {
      setBoard(board)
      setColumns(mapOrder(board.columns, board.columnOrder, '_id'))
    })
  }, [])

  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus()
      newColumnInputRef.current.select()
    }
  }, [openNewColumn])

  if (isEmpty(board)) {
    return <div className='not-board'>No Board Content!</div>
  }

  const onColumnDrop = (dropResult) => {
    if (dropResult.removedIndex == dropResult.addedIndex) return

    let newColumns = cloneDeep(columns)
    let newBoard = cloneDeep(board)

    newColumns = applyDrag(newColumns, dropResult)
    newBoard.columnOrder = newColumns.map((col) => col._id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)

    //call api update board and column
    updateBoard(newBoard._id, newBoard).catch(() => {
      setColumns(columns)
      setBoard(board)
    })
  }

  const onCardDrop = async (columnId, dropResult) => {
    if (dropResult.removedIndex == dropResult.addedIndex) return

    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = cloneDeep(columns)
      //cloneDeep newwColumns error cant change state columns

      let currentColumn = newColumns.find((col) => col._id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = currentColumn.cards.map((card) => card._id)
      flushSync(() => setColumns(newColumns))

      if (dropResult.removedIndex !== null && dropResult.addedIndex !== null) {
        await updateColumn(currentColumn._id, currentColumn).catch(() => setColumns(columns))
      } else {
        await updateColumn(currentColumn._id, currentColumn).catch(() => {
          setColumns(columns)
        })

        if (dropResult.addedIndex !== null) {
          let currentCard = cloneDeep(dropResult.payload)
          currentCard.columnId = currentColumn._id
          updateCard(currentCard._id, currentCard)
        }
      }
    }
  }

  const addNewColumn = () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus()
      return
    }
    const newColumn = {
      title: newColumnTitle.trim(),
      boardId: board._id
    }

    createNewColumn(newColumn).then((column) => {
      let newColumns = [...columns]
      newColumns.push(column)

      let newBoard = { ...board }
      newBoard.columnOrder = newColumns.map((col) => col._id)
      newBoard.columns = newColumns

      setBoard(newBoard)
      setColumns(newColumns)
      setNewColumnTitle('')
      toggleNewColumnForm()
    })
  }

  const onColumnUpdateState = (newColumnToUpdate) => {
    const columnIdToUpdate = newColumnToUpdate._id
    let newColumns = [...columns]
    const columnIndexToUpdate = newColumns.findIndex((col) => col._id === columnIdToUpdate)

    if (newColumnToUpdate._destroy) {
      //remove column
      newColumns.splice(columnIndexToUpdate, 1)
    } else {
      //update column
      newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)
    }

    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map((col) => col._id)
    newBoard.columns = newColumns

    setBoard(newBoard)
    setColumns(newColumns)
  }

  return (
    <div className='board-content'>
      <Container
        orientation='horizontal'
        onDrop={onColumnDrop}
        getChildPayload={(index) => columns[index]}
        dragHandleSelector='.column-drag-handle'
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'board-column-drop-preview'
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <BoardColumn column={column} onCardDrop={onCardDrop} onColumnUpdateState={onColumnUpdateState} />
          </Draggable>
        ))}
      </Container>
      <BootstrapContainer className='bootstrap-container'>
        {!openNewColumn && (
          <Row>
            <Col className='add-new-column' onClick={toggleNewColumnForm}>
              <i className='fa fa-plus icon'></i>Add another column
            </Col>
          </Row>
        )}
        {openNewColumn && (
          <Row>
            <Col className='enter-new-column'>
              <Form.Control
                size='sm'
                type='email'
                placeholder='Enter column title...'
                className='input-enter-new-column'
                ref={newColumnInputRef}
                onChange={onNewColumnTitleChange}
                // onBlur={toggleNewColumnForm}
                value={newColumnTitle}
              />
              <Button className='add-new-col success' variant='success' size='sm' onClick={addNewColumn}>
                Add list
              </Button>
              <span onClick={toggleNewColumnForm} className='trello-cancle-icon'>
                <i className='fa fa-trash icon' />
              </span>
            </Col>
          </Row>
        )}
      </BootstrapContainer>
    </div>
  )
}

export default BoardContent
