import '../App.css';
import * as React from 'react';
import {Navbar,Container, Nav} from 'react-bootstrap';

const NavBar = () => { 
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
    <Nav className="me-auto">
      <Nav.Link href="/home">Home</Nav.Link>
      <Nav.Link href="/form">Form</Nav.Link>
      <Nav.Link href="/list">List</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  )
}

export default NavBar