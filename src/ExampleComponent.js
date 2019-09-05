import React, { Component } from 'react';
import ReCAPTCHA from 'react-google-recaptcha'
import Gallery from './screens/Profile/Gallerie'

class ExampleComponent extends Component {   
  render() {
    const photos = [
      {
          photo: 'profileImg/chine3.jpg',
          thumbnail: 'profileImg/chine3.jpg'
      },
      {
          photo: 'profileImg/chine4.jpg',
      },
      {
          photo: 'profileImg/chine8.jpg',
      },
  ];
    return (
      <Gallery photos={photos}></Gallery>
    );
  };
};

export default ExampleComponent;