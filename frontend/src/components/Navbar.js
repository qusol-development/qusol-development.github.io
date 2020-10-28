import React from 'react';
import { FaGlobe,FaBell ,FaIdBadge } from "react-icons/fa";
import {Navbar, Form, Nav, FormControl, Button} from 'react-bootstrap';
import SignIn from './SignInScreen';

function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Qusol-Image</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-4 mr-auto">
            <Nav.Link href="#home">Trending</Nav.Link>
            <Nav.Link href="#article">Article</Nav.Link>
            <Nav.Link href="#answer">Answer</Nav.Link>
            <Nav.Link href="#blogs">Blog</Nav.Link>
            <Nav.Link href="#poll">Poll</Nav.Link>
            {/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Nav className="ml-5 mr-4">
              <Nav.Link href="#globe"><FaGlobe/></Nav.Link>
              <Nav.Link href="#notifications"><FaBell/></Nav.Link>
              <Nav.Link href="#badges"><FaIdBadge/></Nav.Link>
              <SignIn/>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;