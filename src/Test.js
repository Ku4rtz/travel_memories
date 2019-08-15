import React, { Component } from "react"
import Home from "./screens/Home/index.js"
import Config from './Config'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearchMinus, faSearchPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import Header from './Header'

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      countries: []
    }
  }

  componentDidMount(){
    fetch(Config.apiUrl + 'country', {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Authorization": localStorage.getItem("xsrfToken")
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        countries: body
      })
    })
    .then(() => {
  
    })
  }


  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Nom du pays</th>
            <th>Alpha2</th>
            <th>image</th>
          </tr>
        </thead>
        <tbody>
        {this.state.countries.map(( listValue, index ) => {
      return (
        <tr key={index}>
          <td>{listValue.name_fr}</td>
          <td>{listValue.alpha2}</td>
          <td><img src={'https://www.countryflags.io/' + listValue.alpha2.toLowerCase() + '/shiny/32.png'}/></td>
        </tr>
      );
    })}
        </tbody>
      </table>
    )
  }
}

export default App