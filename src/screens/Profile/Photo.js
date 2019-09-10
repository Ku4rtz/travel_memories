import React, { Component } from 'react';


class Photo extends Component {

  render () {
    return (
      <img onClick={this.props.openLightbox} className="photoList" src={this.props.src} />
    )
  }
}

export default Photo