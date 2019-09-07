import React, { Component, useState, useCallback } from "react"
import Header from '../Header'
import ModalCountry from '../ModalCountry'
import Photo from './Photo'
import FileBase64 from 'react-file-base64';
import Gallerie from './Gallerie';

class Photos extends Component {
    constructor(props){
        super(props)

        this._child = React.createRef();

        this.state = {
            modalTitle: '',
            alpha3: '',
            country: this.props.location.state ? this.props.location.state.lookedCountry : "",
            files: [],
            photos: []
        }

        this.getDataFromSearchBar = this.getDataFromSearchBar.bind(this);
    }

    getDataFromSearchBar(data, alpha3){
        this.setState({
          modalTitle: data,
          alpha3: alpha3
        }, () => {
          this._child.current.open()
        })
    }

    getFiles(files){
        this.setState({ files: files }, () => {
            var photosArray = [];
            files.forEach(function(file){
                photosArray.push({
                    photo: file.base64
                })
            })
            this.setState({
                photos: photosArray
            })          
        })     
    }

    
    click(){
        console.log(this.state.country)
    }
    

    render() {   

        return (
            <div className="mainPhotos">
                {this.state.redirection}
                <div className="profileHeader">
                    <Header openModal={this.getDataFromSearchBar} />
                </div>
                <ModalCountry ref={this._child} modalTitle={this.state.modalTitle} alpha3={this.state.alpha3} />
                <FileBase64
                    multiple={ true }
                    onDone={ this.getFiles.bind(this) } 
                />
                <div className="header">
                    <div className="banner col-md-12 row">
                        <img className="col-md-4" height="250px" width="250px" className="profil-image" src={process.env.PUBLIC_URL + "img/PROFILPICTURE.jpg"} />                   
                        <div className="col-md-8 userInfos text-center">
                            Photos de Chine
                        </div>
                    </div>
                </div>

            <div className="photosContent row">
                <div className="photos">
                    {this.state.photos.map((item, index) => <Photo src={item.photo} openLightbox={() => {this.setState({
                        activePhotoIndex: index
                    }, this.setState({
                        galleryIsVisible: true
                    }))}} />)}
                    <Gallerie photos={this.state.photos} activePhotoIndex={this.state.activePhotoIndex} galleryIsVisible={this.state.galleryIsVisible} close={() => this.setState({
                    galleryIsVisible: false
                    })} />
                </div>
            </div>
            </div>
        )
    }
}

export default Photos