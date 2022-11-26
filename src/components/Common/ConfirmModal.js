import React from 'react'
import HTMLReactParser from 'html-react-parser'
import { Button, Modal } from 'react-bootstrap'

function ComfirmModal(props) {
  const { onAction, show, title, content } = props
  return (
    <Modal show={show} onHide={() => onAction('close')}>
      <Modal.Header closeButton>
        <Modal.Title className="h5">{HTMLReactParser(title)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{HTMLReactParser(content)}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onAction('close')}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onAction('cofirm')}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ComfirmModal
