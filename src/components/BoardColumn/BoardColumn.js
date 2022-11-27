import React, { useState, useEffect, useRef } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Form, Dropdown, Button } from 'react-bootstrap'
import { cloneDeep } from 'lodash'

import ConfirmModal from 'components/Common/ConfirmModal'
import './BoardColumn.scss'
import Card from 'components/Card/Card'
import { mapOrder } from 'utilities/sorts'
import { MODAL_ACTION_CONFIRM } from 'utilities/contants'
import {
  onInputPressEnter,
  selectAllInlineText
} from 'utilities/contentEditable'
function BoardColumn(props) {
  const { column, onCardDrop, onColumnUpdate } = props
  const cards = mapOrder(column.cards, column.cardOrder, 'id')

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [titleColumn, setTitleColumn] = useState('')

  const [openNewCard, setOpenNewCard] = useState(false)
  const toggleNewCardArea = () => setOpenNewCard(!openNewCard)

  const newCardInputAreaRef = useRef(null)
  const [newCardTitle, setNewCardTitle] = useState('')

  useEffect(() => {
    if (newCardInputAreaRef && newCardInputAreaRef.current) {
      newCardInputAreaRef.current.focus()
      newCardInputAreaRef.current.select()
    }
  }, [openNewCard])

  useEffect(() => {
    setTitleColumn(column.title)
  }, [column.title])

  const handleColumnTitleChange = e => setTitleColumn(e.target.value)

  const handleColumnTitleBlur = () => {
    const newColumn = {
      ...column,
      title: titleColumn
    }
    onColumnUpdate(newColumn)
  }

  const toggleShowConfirmModal = () => {
    setShowConfirmModal(!showConfirmModal)
  }
  const onConfirmModalAction = type => {
    if (type === MODAL_ACTION_CONFIRM) {
      const newColumn = {
        ...column,
        _destroy: true
      }
      onColumnUpdate(newColumn)
    }
    toggleShowConfirmModal()
  }
  const onNewCardTitleChange = e => setNewCardTitle(e.target.value)

  const addNewCard = () => {
    if (!newCardTitle) {
      newCardInputAreaRef.current.focus()
      return
    }

    const newCard = {
      id: Math.random().toString(36).substring(2, 5),
      boardId: column.boardId,
      columnId: column.id,
      title: newCardTitle.trim(),
      cover: null
    }

    let newColumn = cloneDeep(column)
    newColumn.cards.push(newCard)
    newColumn.cardOrder.push(newCard.id)
    onColumnUpdate(newColumn)

    setNewCardTitle('')
    newCardInputAreaRef.current.focus()
  }
  return (
    <div className="board-column">
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control
            size="sm"
            type="text"
            className="trello-input-editable"
            onChange={handleColumnTitleChange}
            onBlur={handleColumnTitleBlur}
            onClick={selectAllInlineText}
            spellCheck="false"
            value={titleColumn}
            onKeyDown={onInputPressEnter}
            onMouseDown={e => e.preventDefault()}
          />
        </div>
        <span className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle
              className="dropdown-btn"
              id="dropdown-basic"
              size="sm"
            />

            <Dropdown.Menu>
              <Dropdown.Item onClick={toggleNewCardArea}>
                Add card...
              </Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal}>
                Remove card
              </Dropdown.Item>
              <Dropdown.Item>Move alll cards in this list (beta)</Dropdown.Item>
              <Dropdown.Item>
                Archive all cards in this list (beta)
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </span>
      </header>
      <div className="cards">
        <Container
          groupName="col"
          onDrop={dragResult => onCardDrop(column.id, dragResult)}
          getChildPayload={index => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
        {openNewCard && (
          <div className="add-new-card-area">
            <Form.Control
              size="sm"
              as="textarea"
              className="new-input-area"
              placeholder="Enter a title for this card..."
              // onChange={handleColumnTitleChange}
              // onBlur={handleColumnTitleBlur}
              // onClick={selectAllInlineText}
              spellCheck="false"
              // value={titleColumn}
              onKeyDown={e => e.key === 'Enter' && addNewCard()}
              onChange={onNewCardTitleChange}
              value={newCardTitle}
              ref={newCardInputAreaRef}
              rows="3"
            />
          </div>
        )}
      </div>
      <footer>
        {openNewCard && (
          <div className="add-new-card-area-actions">
            <Button
              className="add-new-col success"
              variant="success"
              size="sm"
              onClick={addNewCard}
            >
              Add list
            </Button>
            <span onClick={toggleNewCardArea} className="trello-cancle-icon">
              <i className="fa fa-trash icon" />
            </span>
          </div>
        )}
        {!openNewCard && (
          <div onClick={toggleNewCardArea} className="footer-actions">
            <i className="fa fa-plus icon"></i>Add another card
          </div>
        )}
      </footer>
      <ConfirmModal
        show={showConfirmModal}
        onAction={() => onConfirmModalAction(MODAL_ACTION_CONFIRM)}
        title="Remove Column"
        content={`Are you sure want to remove <strong>${column.title}</strong>? </br>All related cards will also be removed !!`}
      />
    </div>
  )
}

export default BoardColumn
