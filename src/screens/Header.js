import React from "react"
import ProfilPicture from '../css/img/PROFILPICTURE.jpg';
import TravelmemoriesText from '../components/TravelmemoriesText/index';
import { Dropdown } from 'react-bootstrap'
import Searchbar from "./Searchbar";
import { Redirect } from 'react-router-dom'
import Config from '../Config'
import './styles.css'


class HomeHeader extends React.Component{
  constructor(props) {
    super()

    this.state = {
      fromChild: "",
      redirection: '',
      userName: '',
      userFirstName: ''
    }

    this.getDataFromSearchBar = this.getDataFromSearchBar.bind(this);
    this.goToFriends = this.getDataFromSearchBar.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.goToHome = this.goToHome.bind(this);
  }

  goToProfile(){
    this.setState({
      redirection: <Redirect exact from="/" to={{
        pathname: '/profile',
        state: { 
          thisUser: true,
          userFirstName: this.state.userFirstName,
          userName: this.state.userName
        }
    }} />
    })
  }

  goToFriends(){
    this.setState({
      redirection: <Redirect to='/friends' />
    })
  }

  goToHome(){
    this.setState({
      redirection: <Redirect to='/' />
    })
  }

  disconnect(){

    fetch('http://localhost:3001/disconnect', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('xsrfToken')
        }
      })
      .then( () => {
        localStorage.removeItem('xsrfToken')
        this.setState({
          redirection: <Redirect to='/connexion' />
        })
      })  
  }

  getDataFromSearchBar(data, alpha3){
    this.props.openModal(data, alpha3)
  }

  componentDidMount(){
    fetch(Config.apiUrl + 'thisuser', {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Authorization": localStorage.getItem("xsrfToken")
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        userFirstName: body.firstName,
        userName: body.name
      })
    })
    .catch(err => {
      console.log("Erreur de chargement de l'API")
    })   
  }

  render(){
    return(
      <div className="navBar">
      {this.state.redirection}
      <div className="navHeader"
        onClick={this.goToHome}>
        <TravelmemoriesText />
      </div>
      <div className="navBody">
        <div className="searchPadding">
        <Searchbar openModal={this.props.openModal} />
        </div>
      </div>
      <div className="navFooter">
        <Dropdown>
          <Dropdown.Toggle>
          <div className="profilName">
            {this.state.userFirstName} {this.state.userName}
          </div>
          <img src={ProfilPicture} className="profilPicture" />
          </Dropdown.Toggle>
          
          <Dropdown.Menu>
            <Dropdown.Header>
              <img src={ProfilPicture} className="dropdownPicture" />
              <div className="dropdownProfilName text-center">
              {this.state.userFirstName} {this.state.userName}
              </div>
              <div className="dropdownProfilStatus text-center">
                Globe Trotteur
              </div>
             </Dropdown.Header>
            <Dropdown.Item
              onClick={this.goToProfile}
            >Profil</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={this.goToFriends}
            >Amis</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={this.disconnect}
            >Se déconnecter</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      </div>             
    )
  }
}

export default HomeHeader;
