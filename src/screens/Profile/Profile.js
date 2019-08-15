import React, { Component } from "react"
import Header from '../Header'
import ModalCountry from '../ModalCountry'
import './styles.css'
import WorldMap from './WorldMap'
import { Redirect } from 'react-router-dom'

class Profile extends Component {
    constructor(props){
        super(props)

        this._child = React.createRef();

        this.state = {
            modalTitle: '',
            alpha3: '',
            thisUser: this.props.location.state ? this.props.location.state.thisUser : "",
            userName: this.props.location.state ? this.props.location.state.userName : "",
            userFirstName : this.props.location.state ? this.props.location.state.userFirstName : "",
            redirection: ""
        }

        this.getDataFromSearchBar = this.getDataFromSearchBar.bind(this);
        this.goToMap = this.goToMap.bind(this);
    
    }

    componentDidMount(){
    }

    getDataFromSearchBar(data, alpha3){
        this.setState({
          modalTitle: data,
          alpha3: alpha3
        }, () => {
          this._child.current.open()
        })
    }

    goToMap(){
        this.setState({
            redirection: <Redirect to='/' />
        })
    }

    render() {
        return (
            <div className="profile">
                {this.state.redirection}
                <Header openModal={this.getDataFromSearchBar} />
                <ModalCountry ref={this._child} modalTitle={this.state.modalTitle} alpha3={this.state.alpha3} />
                <div className="header">
                    <div className="banner col-md-12 row">
                        <img className="col-md-4" height="250px" width="250px" className="profil-image" src={process.env.PUBLIC_URL + "img/PROFILPICTURE.jpg"} />                   
                        <div className="col-md-8 userInfos text-center">
                            {this.state.userFirstName} {this.state.userName}
                            <div className="userStatus">Globe Trotter</div>
                        </div>
                    </div>
                </div>

                <div className="content col-md-12">
                    <div className="col-md-6">
                        
                    </div>
                    <div className="col-md-6 pull-right worldmap">
                        <WorldMap thisUser={this.state.thisUser} redirect={this.goToMap} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile