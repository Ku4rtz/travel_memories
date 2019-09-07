import React, { Component } from "react"
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import axios from "axios";
import { Redirect, withRouter } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:3001/'
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredential = true;

function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

class Header extends Component {
  constructor(props) {
    super()

    this.state = {
      login: '',
      password: '',
      errMess: '',
      redirect: false,
      renderRedirect: ''
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!isEmptyOrSpaces(this.state.login) && !isEmptyOrSpaces(this.state.password)) {
      let self = this
      fetch('http://localhost:3001/auth', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          'login': self.state.login,
          'password': self.state.password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(body => {
          if (body.success) {
            try {
              localStorage.setItem('xsrfToken', body.xsrfToken)
              this.setState({
                renderRedirect: <Redirect to='/' />
              })
            } catch (error) {
              console.log(error);
              this.setState({
                errMess: 'Erreur de connexion, veuillez réesayer.'
              })
            }
          }
          else {
            this.setState({ errMess: body.message })
          }
        }
        )
    }
    else {
      this.setState({
        errMess: "Vous devez renseigner un login et un mot de passe."
      })
    }
  }


  handleChange(evt) {
    const target = evt.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        {this.state.renderRedirect}
        <Navbar collapseOnSelect expand="lg" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Nav>
              <Form onSubmit={event => this.handleSubmit(event)} inline>
                <div className="red">{this.state.errMess}</div>&nbsp;
                  <FormControl type="text" name="login" placeholder="Adresse e-mail"
                  onChange={(evt) => this.handleChange(evt)}
                ></FormControl>&nbsp;
                  <FormControl type="password" name="password" placeholder="Mot de passe"
                  onChange={(evt) => this.handleChange(evt)}
                ></FormControl>&nbsp;
                  <Button type="submit" className="btn">
                  Connexion
                  </Button>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Header