import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import logo from '../images/open-book.svg'

const Navigation = () => {
  return (
    <>
      <Navbar className="nav-bar" variant="dark" expand="">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="35"
              height="35"
              className="d-inline-block align-top svg-img"
            />{' '}
            <span className="nav-title">
              MentalidadWeb <span className="nav-higlight">To-Do</span>
            </span>
          </Navbar.Brand>
          <a
            href="http://127.0.0.1:5000/api/v1/documentation/"
            class="nav-link"
            style={{ color: 'white', position: 'relative', top: '6px' }}
          >
            <p>See the docs</p>
          </a>
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation
