import React from 'react'
import './BoardBar.scss'
import { Col, Row, Dropdown } from 'react-bootstrap'

function BoardBar() {
  return (
    <nav className="navbar board-bar">
      <Col className="workspace">
        <Col className="workspace-item">
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="workspace-item-link"
            >
              <div className="user-icon">
                <i className="fa fa-user icon"></i>
              </div>
              Workspace visible
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Col>
      <Col className="board-header">
        <Row className="board-header-actions">
          <Col className="board-header-actions-item">
            <Dropdown>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className="board-header-actions-link"
              >
                <div className="rocket-icon">
                  <i className="fa fa-rocket icon"></i>
                </div>
                Power-Ups
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col className="board-header-actions-item">
            <Dropdown>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className="board-header-actions-link"
              >
                <div className="bolt-icon">
                  <i className="fa fa-bolt icon"></i>
                </div>
                Automation
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col className="board-header-actions-item">
            <Dropdown>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className="board-header-actions-link"
              >
                <div className="filter-icon">
                  <i className="fa fa-filter icon"></i>
                </div>
                Filter
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Col>
    </nav>
  )
}

export default BoardBar
