import React from 'react'
import './AppBar.scss'
import { Form, Col, Row, Dropdown } from 'react-bootstrap'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function AppBar() {
  return (
    <nav className='navbar app-bar'>
      <Col className='header'>
        <Col className='header-dock'>
          <Dropdown>
            <Dropdown.Toggle variant='success' id='dropdown-basic' className='dock-link'>
              <i className='fa fa-th icon'></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
              <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
              <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className='header-logo'>
          <a href='#!' className='btn logo-link'>
            <div>
              <div className='logo-bg'></div>
            </div>
          </a>
        </Col>
        <Row className='header-menu'>
          <Col className='header-menu-item'>
            <Dropdown>
              <Dropdown.Toggle variant='success' id='dropdown-basic' className='header-menu-link'>
                Workspaces
                <i className='fa fa-angle-down icon'></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
                <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col className='header-menu-item'>
            <Dropdown>
              <Dropdown.Toggle variant='success' id='dropdown-basic' className='header-menu-link'>
                Recent
                <i className='fa fa-angle-down icon'></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
                <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col className='header-menu-item'>
            <Dropdown>
              <Dropdown.Toggle variant='success' id='dropdown-basic' className='header-menu-link'>
                Starred
                <i className='fa fa-angle-down icon'></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
                <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col className='header-menu-item'>
            <Dropdown>
              <Dropdown.Toggle variant='success' id='dropdown-basic' className='header-menu-link'>
                Templates
                <i className='fa fa-angle-down icon'></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
                <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Col className='header-create'>
          <a className='header-create-link btn btn--primary'>Create</a>
        </Col>
      </Col>
      <Col className='header-right'>
        <Col className='search'>
          <div className='search-icon'>
            <i className='fa fa-search icon'></i>
          </div>
          <Form.Control
            size='sm'
            type='search'
            className='search-input'
            placeholder='Search'
            aria-label='Search'
            aria-describedby='basic-addon1'
          />
        </Col>
        <Col className='header-notify'>
          <Dropdown>
            <Dropdown.Toggle id='dropdown-basic' className='header-notify-link'>
              <i className='fa fa-bell icon'></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
              <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
              <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className='header-info'>
          <Dropdown>
            <Dropdown.Toggle id='dropdown-basic' className='header-info-btn'>
              <i className='fa fa-info-circle icon'></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
              <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
              <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className='header-user'>
          <Dropdown>
            <Dropdown.Toggle id='dropdown-basic' className='header-user-btn'>
              <div className='user-bg-img'></div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
              <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
              <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Col>
    </nav>
  )
}

export default AppBar
