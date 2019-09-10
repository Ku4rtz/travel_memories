import React, { Component } from "react"
import Gallery from 'react-grid-gallery';

class Example extends Component {
  constructor(props) {
    super()
  }

  render() {
    const photos = [
      {
          src: 'profileImg/chine1.jpg',
          thumbnail: 'profileImg/chine1.jpg'
      },
      {
          src: 'profileImg/chine2.jpg',
          thumbnail: 'profileImg/chine2.jpg'
      },
      {
          src: 'profileImg/chine3.jpg',
          thumbnail: 'profileImg/chine3.jpg'
      },
      {
          src: 'profileImg/chine4.jpg',
          thumbnail: "profileImg/chine4.jpg"
      },
      {
          src: 'profileImg/chine5.jpg',
          thumbnail: 'profileImg/chine5.jpg'
      },
      {
          src: 'profileImg/test.png',
          thumbnail: 'profileImg/test.png'
      },
      {
          src: 'profileImg/chine6.jpg',
          thumbnail: 'profileImg/chine6.jpg'
      },
      {
          src: 'profileImg/chine7.jpg',
          thumbnail: 'profileImg/chine7.jpg',
      },
      {
          src: 'profileImg/chine8.jpg',
          thumbnail: 'profileImg/chine8.jpg'
      },
      {
          src: 'profileImg/chine9.jpg',
          thumbnail: 'profileImg/chine9.jpg'
      },
      {
          src: 'profileImg/chine10.jpg',
          thumbnail: 'profileImg/chine10.jpg'
      },
    ];

    return (
      <Gallery images={photos}/>
    )
  }
}

export default Example