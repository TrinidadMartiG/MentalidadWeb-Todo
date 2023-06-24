import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import logo from '../images/open-book.svg'

const Navigation = () => {
  return (
    <>
      <Navbar className='nav-bar' variant="dark" expand="">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="35"
              height="35"
              className="d-inline-block align-top"
            />{' '}
            <span className="nav-title">MentalidadWeb <span className='nav-higlight'>To-Do</span></span>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation
