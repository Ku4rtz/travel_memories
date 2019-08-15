import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Config from './Config';

export default function Security(ComponentToProtect) {
    return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }
    componentDidMount() {
        let self = this
        fetch(Config.apiUrl + 'checktoken', {
            credentials: 'include',
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': localStorage.getItem('xsrfToken')
            }
        })
        .then(response => response.json())
        .then(body =>
        {
          if(body.success){
              self.setState({ loading: false });
          } else {
              self.setState({ loading: false, redirect: true });
          }
        })
        .catch(function(error) {
          console.log(error.message);
          self.setState({ loading: false, redirect: true });
        });
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="./connexion" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect />
        </React.Fragment>
      );
    }
  }
}