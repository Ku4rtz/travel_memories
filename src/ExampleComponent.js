import React, { Component } from 'react';
import ReCAPTCHA from 'react-google-recaptcha'

class ExampleComponent extends Component {   
    constructor(){
      super()
  
      this.state = {
        recaptchaResponse : ''
      }

      this.handleCaptchaResponseChange = this.handleCaptchaResponseChange.bind(this);    
    }

  handleCaptchaResponseChange(response) {
    this.setState({
      recaptchaResponse: response,
    }, () => console.log(this.state.recaptchaResponse));
  }

  render() {
    return (
      <ReCAPTCHA
        className="captcha"
        ref="recaptcha"
        sitekey="6LcyQ6gUAAAAAJ5KmJhaXrOefFKYNwVt2H4i6Ooj"
        onChange={this.handleCaptchaResponseChange}
       />
    );
  };
};

export default ExampleComponent;