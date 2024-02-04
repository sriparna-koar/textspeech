
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';


export default function NavigationBar() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/">Summary</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto justify-content-between w-100">
       
            <Nav.Link href="/text-to-speech">Text Modification</Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}