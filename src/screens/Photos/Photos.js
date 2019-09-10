import React, { Component, useState, useCallback } from "react"
import Header from '../Header'
import ModalCountry from '../ModalCountry'
import Photo from './Photo'
import FileBase64 from 'react-file-base64';
import Gallerie from './Gallerie';
import ReactFileReader from 'react-file-reader'
import { isArray } from "util";
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
            photosToAdd: [],
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
        var photosArray = this.state.photosToAdd;
        files.base64.forEach(function(base64){
             photosArray.push({
                photo: base64
            })
        })
        this.setState({
            photosToAdd: photosArray
        })

        if(this.state.photosToAdd.length != 0)
        {
            this.setState({
                showAddPhotos: "d-block"
            })
        }
    }

    
    storePhotos(){
        console.log("on enregistre les photos avec l'API.")
        this.setState({
            showAddPhotos: "d-none",
            photosToAdd: []
        })
    }

    cancelAddPhotos(){
        console.log("On annule l'enregistrement")
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
                <ReactFileReader handleFiles={this.handleFiles} multipleFiles={true} base64={true} fileTypes={[".jpg", ".tif", ".tiff", ".jpeg", ".gif", ".png", ".bmp"]}>
                    <div class="text-center">
                        <button className='btn btn-info form-control btnAdd col-md-2'>Ajouter des photos</button>
                    </div>
                </ReactFileReader>

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