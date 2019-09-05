import React, { Component, useState, useCallback } from "react"
import Header from '../Header'
import ModalCountry from '../ModalCountry'
import './styles.css'
import WorldMap from './WorldMap'
import { Redirect } from 'react-router-dom'
import Gallerie from './Gallerie.js'
import Photo from './Photo.js'

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
            redirection: "",
            galleryIsVisible: false,
            activePhotoIndex: 0
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
            photo: 'profileImg/chine1.jpg',
        },
        {
            photo: 'profileImg/chine2.jpg'
        },
        {
            photo: 'profileImg/chine3.jpg',
        },
        {
            photo: 'profileImg/chine4.jpg',
        },
        {
            photo: 'profileImg/chine5.jpg',
        },
        {
            photo: 'profileImg/chine6.jpg'
        },
        {
            photo: 'profileImg/chine7.jpg',
        },
        {
            photo: 'profileImg/chine8.jpg',
        },
        {
            photo: 'profileImg/chine9.jpg',
        },
        {
            photo: 'profileImg/chine10.jpg',
        },
        {
            photo: 'profileImg/chine1.jpg',
        },
        {
            photo: 'profileImg/chine2.jpg'
        },
        {
            photo: 'profileImg/chine3.jpg',
        },
        {
            photo: 'profileImg/chine4.jpg',
        },
        {
            photo: 'profileImg/chine5.jpg',
        },
        {
            photo: 'profileImg/chine6.jpg'
        },
        {
            photo: 'profileImg/chine7.jpg',
        },
        {
            photo: 'profileImg/chine8.jpg',
        },
        {
            photo: 'profileImg/chine9.jpg',
        },
        {
            photo: 'profileImg/chine10.jpg',
        },
    ];

        return (
            <div className="profile">
                {this.state.redirection}
                <div class="genBanner">
                <div className="profileHeader">
                    <Header openModal={this.getDataFromSearchBar} />
                </div>
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
                        {photos.map((item, index) => <Photo src={item.photo} openLightbox={() => {console.log(index); this.setState({
                            activePhotoIndex: index
                        }, this.setState({
                            galleryIsVisible: true
                        }))}} />)}
                        <Gallerie photos={photos} activePhotoIndex={this.state.activePhotoIndex} galleryIsVisible={this.state.galleryIsVisible} close={() => this.setState({
                            galleryIsVisible: false
                        })} />
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