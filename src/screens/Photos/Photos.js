import React, { Component, useState, useCallback } from "react"
import Header from '../Header'
import ModalCountry from '../ModalCountry'
import Photo from './Photo'
import Gallerie from './Gallerie';
import ReactFileReader from 'react-file-reader'
import Config from '../../Config'
import './styles.css'

class Photos extends Component {
    constructor(props){
        super(props)

        this._child = React.createRef();

        this.state = {
            modalTitle: '',
            alpha3: '',
            countryName: this.props.location.state ? this.props.location.state.lookedCountry : "",
            countryAlpha3: this.props.location.state ? this.props.location.state.lookedAlpha3 : "",
            photos: [],
            showAddPhotos: "d-none",
            photosToAdd: []
        }

        this.getDataFromSearchBar = this.getDataFromSearchBar.bind(this);
        this.handleFiles = this.handleFiles.bind(this);
        this.storePhotos = this.storePhotos.bind(this);
        this.cancelAddPhotos = this.cancelAddPhotos.bind(this);
    }

    getDataFromSearchBar(data, alpha3){
        this.setState({
          modalTitle: data,
          alpha3: alpha3
        }, () => {
          this._child.current.open()
        })
    }

    handleFiles(files){
        let photosStamp = [];
        files.base64.forEach(function(file){
            photosStamp.push({
                photo: file,
                base64: file,
                title: "Titre",
                description: "Description"
            })
        })
        this.setState({
            photosToAdd: photosStamp
        }, () => console.log(this.state.photosToAdd))

        this.setState({
            showAddPhotos: 'd-block'
        })
    }

    componentDidMount(){
        var photosArray = this.state.photos;
        let self = this;
        fetch(Config.apiUrl + 'photos_thisUser/' + this.state.countryAlpha3, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": localStorage.getItem("xsrfToken")
            }
          })
          .then(response => response.json())
          .then(body => {
              body.forEach(function(data){
                  self.setState({
                      photos: self.state.photos.concat({
                          photo: data.base64,
                          caption: data.title,
                          subcaption: data.description
                      })
                  })
              })
          })
          .catch(err => {
              console.log(err)
          })
    }
    
    storePhotos(){
        fetch(Config.apiUrl + 'addPhotos', {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify({
              'photos': this.state.photosToAdd,
              'alpha3': this.state.countryAlpha3
            }),
            headers: {
              'Content-Type': 'application/json',
              "Authorization": localStorage.getItem("xsrfToken")
            }
          })
          .then(response => response.json())
          .then(body => {
            this.setState({
                photos: this.state.photos.concat(this.state.photosToAdd),
                showAddPhotos: "d-none",
                photosToAdd: []
            })
          })
          .catch(err => {
              console.log(err)
          })
    }

    cancelAddPhotos(){
        this.setState({
            showAddPhotos: "d-none",
            photosToAdd: []
        })
    }
    

    render() {   

        return (
            <div className="mainPhotos">
                {this.state.redirection}
                <div className="profileHeader">
                    <Header openModal={this.getDataFromSearchBar} />
                </div>
                <ModalCountry ref={this._child} modalTitle={this.state.modalTitle} alpha3={this.state.alpha3} />
                <div className="header">
                    <div className="banner col-md-12 row">               
                        <div className="col-md-12 titlePhotos text-center">
                            Photos de {this.state.countryName}
                        </div>
                    </div>
                </div>
            <div className="photosContent">               
                <div className="text-center">
                    <ReactFileReader fileTypes={[".png", ".jpg", ".jpeg", ".bmp"]} base64={true} multipleFiles={true} handleFiles={this.handleFiles}>
                        <button className="btn btn-info btnAdd">Ajouter des photos</button>
                    </ReactFileReader>
                </div>

                <div className={"photosToAdd row text-center " + (this.state.showAddPhotos)}>
                    <div className="photosFull photosToAddWithButton">
                        {this.state.photosToAdd.map((item, index) => <Photo src={item.photo} openLightbox={() => {console.log("opened")}} />)}
                    </div>
                    <div className="col-md-12 text-center">
                        <button
                            className="btn btn-success form-control btnValid col-md-1"
                            onClick={this.storePhotos}
                        >
                            Ajouter
                        </button>
                        <button
                            className="btn btn-danger form-control btnCancel col-md-1"
                            onClick={this.cancelAddPhotos}
                        >
                            Annuler
                        </button>
                    </div>
                </div>           

                <div className="photosContent row">
                    <div className="photosFull">
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
            </div>
        )
    }
}

export default Photos