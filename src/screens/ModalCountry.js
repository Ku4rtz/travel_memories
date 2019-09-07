import React, { Component } from "react"
import { Modal, Button } from 'react-bootstrap'
import Config from '../Config'
import './styles.css'
import { Redirect } from 'react-router-dom'

class ModalCountry extends React.Component{
  constructor(props) {
    super()

    this.close = this.close.bind(this)

    this.open = this.open.bind(this)

    this.state = {
      showModal: false,
      redirection: "",
      lookedCountry: ""
    }
  }

  close(){
    let self = this;
    this.setState({
      showModal: false
    })
    if(this.props.countries)
    {
      this.props.countries.objects.units.geometries.forEach(function(country){
        if(country.id === self.props.alpha3)
        {
          country.properties.focused = false;
        }
      })
      this.props.refreshMap(this.props.countries)
    }
  }

  open(){
    this.setState({ 
      showModal: true 
    })
  }

  goToPhotos(){
    let self = this;
    if(this.props.countries)
    {
      this.props.countries.objects.units.geometries.forEach(function(country){
        if(country.id === self.props.alpha3)
        {
          country.properties.focused = false;
        }
      })
    }
    this.setState({
        redirection: <Redirect exact from="/" to={{
          pathname: '/photos',
          state: { 
            lookedCountry: this.props.alpha3
          }
      }} />
    })
  }

  visited(){
  let self = this;
  fetch(Config.apiUrl + 'thisuser_addcountry', {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify({
      'alpha3': this.props.alpha3
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(body => {
    this.close();
    this.props.countries.objects.units.geometries.forEach(function(country){
      if(country.id === self.props.alpha3)
      {
        country.properties.visited = true;
      }
    })
    this.props.refreshMap(this.props.countries);
  })
  }

  handleChange = selectedOption => {
    if(selectedOption.type == "country"){
      this.props.openModal(selectedOption.label)
    }
  };

  render(){
    return(
      <div>
        {this.state.redirection}
        <Modal 
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          restoreFocus={false}
          show={this.state.showModal} onHide={() => this.close()}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <h4>{this.props.modalTitle}</h4>
            </Modal.Title>
           </Modal.Header>
           <Modal.Body>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
              consectetur ac, vestibulum at eros.
            </p>
           </Modal.Body>
           <Modal.Footer>
            <Button className="visitedButton pull-left" onClick={() => this.visited()}>Visité</Button>
            <Button onClick={() => this.goToPhotos()}>Photos</Button>
           </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default ModalCountry;