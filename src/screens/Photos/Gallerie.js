import React, { Component } from 'react';
import ReactBnbGallery from 'react-bnb-gallery';

class Gallery extends Component {
  constructor() {
    super(...arguments);
  }

  render () {
    return (
      <div>
      <ReactBnbGallery
        show={this.props.galleryIsVisible}
        photos={this.props.photos}
        onClose={this.props.close}
        activePhotoIndex={this.props.activePhotoIndex}
        opacity={0.80}
        //  phrases={
        //    noPhotosProvided= "Aucune photo",
        //    showPhotoList= "Montrer la liste",
        //    hidePhotoList= "Cacher la liste"
        //  }
      />
      </div>
    )
  }
}

export default Gallery