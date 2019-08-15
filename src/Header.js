import React, { Component } from "react"
import './css/Header.css'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'

class Header extends Component {
  constructor(props) {
    super()

    this.state = {
      renderRedirect: ''
    }
  }

  render() {
    return (
      <div className="navBar">
        {this.state.renderRedirect}
        <Navbar className="navBar">
          <Navbar.Brand href="#home">Travel Memories</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="body">
              <Form inline>
                <input type="text" className="search" placeholder="Recherche"></input>
                <Button className="btn-search"
                  onClick={() => this.handleClick()}>
                  <span className="fa fa-search" />
                </Button>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div >
    )
  }
}

export default Header