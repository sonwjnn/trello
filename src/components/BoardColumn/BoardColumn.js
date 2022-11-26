import React, { useCallback, useState, useEffect } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Form, Dropdown } from 'react-bootstrap'

import ConfirmModal from 'components/Common/ConfirmModal'
import './BoardColumn.scss'
import Card from 'components/Card/Card'
import { mapOrder } from 'utilities/sorts'
import { MODAL_ACTION_REMOVE } from 'utilities/contants'
import {
  onInputPressEnter,
  selectAllInlineText
} from 'utilities/contentEditable'
function BoardColumn(props) {
  const { column, onCardDrop, onColumnUpdate } = props
  const cards = mapOrder(column.cards, column.cardOrder, 'id')

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [titleColumn, setTitleColumn] = useState('')
  useEffect(() => {
    setTitleColumn(column.title)
  }, [column.title])

  const handleColumnTitleChange = useCallback(
    e => setTitleColumn(e.target.value),
    []
  )

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
    if (type === 'confirm') {
      const newColumn = {
        ...column,
        _destroy: true
      }
      onColumnUpdate(newColumn)
    }
    toggleShowConfirmModal()
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
              <Dropdown.Item>Add card...</Dropdown.Item>
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
      </div>
      <footer>
        <div className="footer-actions">
          <i className="fa fa-plus icon"></i>Add another card
        </div>
      </footer>
      <ConfirmModal
        show={showConfirmModal}
        onAction={() => onConfirmModalAction(MODAL_ACTION_REMOVE)}
        title="Remove Column"
        content={`Are you sure want to remove <strong>${column.title}</strong>? </br>All related cards will also be removed !!`}
      />
    </div>
  )
}

export default BoardColumn
