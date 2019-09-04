import React, { Component, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

class Gallerie extends Component {

  constructor(props){
    super(props)

    this.state = {
      currentImage: 0,
      setCurrentImage: 0,
      viewerIsOpen: false,
      setViewerIsOpen: false,
    }   
}

  render(){
    const openLightbox = useCallback((event, { photo, index }) => {
      this.state.setCurrentImage(index);
      this.state.setViewerIsOpen(true);
    }, []);
  
    const closeLightbox = () => {
      this.state.setCurrentImage(0);
      this.state.setViewerIsOpen(false);
    };

    return (
      <div>
        <Gallery photos={this.props.photos} onClick={openLightbox} />
        <ModalGateway>
          {this.state.viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={this.state.currentImage}
                views={this.props.photos.map(x => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    );
  }
}

export default Gallerie;