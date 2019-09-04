import React, { Component, useState, useCallback } from "react"
import Header from '../Header'
import ModalCountry from '../ModalCountry'
import './styles.css'
import WorldMap from './WorldMap'
import { Redirect } from 'react-router-dom'
import Gallerie from './Gallerie.js'
import Gallery from 'react-photo-gallery'

class Profile extends Component {
    constructor(props){
        super(props)

        this._child = React.createRef();

        this.state = {
            modalTitle: '',
            alpha3: '',
            thisUser: this.props.location.state ? this.props.location.state.thisUser : "",
            userName: this.props.location.state ? this.props.location.state.userName : "",
            userFirstName : this.props.location.state ? this.props.location.state.userFirstName : "",
            redirection: ""
        }

        this.getDataFromSearchBar = this.getDataFromSearchBar.bind(this);
        this.goToMap = this.goToMap.bind(this);
        
    }

    getDataFromSearchBar(data, alpha3){
        this.setState({
          modalTitle: data,
          alpha3: alpha3
        }, () => {
          this._child.current.open()
        })
    }

    goToMap(){
        this.setState({
            redirection: <Redirect to='/' />
        })
    }
    

    render() {

        
  const photos = [
    {
        src: 'profileImg/chine3.jpg',
    },
    {
        src: 'profileImg/chine4.jpg',
    },
    {
        src: 'profileImg/chine8.jpg',
    },
];

        return (
            <div className="profile">
                {this.state.redirection}
                <div class="genBanner">
                <Header openModal={this.getDataFromSearchBar} />
                <ModalCountry ref={this._child} modalTitle={this.state.modalTitle} alpha3={this.state.alpha3} />
                <div className="header">
                    <div className="banner col-md-12 row">
                        <img className="col-md-4" height="250px" width="250px" className="profil-image" src={process.env.PUBLIC_URL + "img/PROFILPICTURE.jpg"} />                   
                        <div className="col-md-8 userInfos text-center">
                            {this.state.userFirstName} {this.state.userName}
                            <div className="userStatus">Globe Trotter</div>
                        </div>
                    </div>
                </div>
                </div>

                <div className="profileContent row">
                    <div className="photos">
                        <Gallery photos={photos} />
                    </div>
                    <div className="worldmap">
                        <WorldMap thisUser={this.state.thisUser} redirect={this.goToMap} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile