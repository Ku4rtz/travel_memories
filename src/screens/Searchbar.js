import React from 'react';
import { components } from 'react-select';
import Select from 'react-select'
import Config from '../Config';
import './styles.css'

const { Option } = components;

const IconOption = (props) => 
  (
    <Option {... props}>
      <div className="searchChoice">
        <img className="img-searchbox" src={props.data.alpha2 == "CS" ? process.env.PUBLIC_URL + "/img/flags_mini/" + props.data.alpha2 + ".png" : props.data.icon} />
        {props.data.label}
      </div>
    </Option>
  );

const customStyle = {      
  control: () => ({
    borderBottom: '1 !important',
    borderRight: '0 !important',
    borderLeft: '0 !important',
    borderTop: '0 !important',
    
    // This line disable the blue border
    boxShadow: '0 !important',
  }),

  menu: (provided) => ({
    ...provided,
    backgroundColor: "rgba(244, 241, 236, 0.5)"
  })
}

class Searchbar extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      selectedOption: null,
      options: []
    }
  }

  handleChange = selectedOption => {
    if(selectedOption.type == "country"){
      this.props.openModal(selectedOption.label, selectedOption.alpha3)
    }
  };

  componentDidMount(){
    let arr = [];

    fetch(Config.apiUrl + 'country', {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Authorization": localStorage.getItem("xsrfToken")
      }
    })
    .then(response => response.json())
    .then(body => {
        body.forEach(function(country){
          arr.push({ value: country.name_fr, label: country.name_fr, type: "country", alpha3: country.alpha3, alpha2: country.alpha2, icon: 'https://www.countryflags.io/' + country.alpha2.toLowerCase() + '/shiny/32.png'})
        })
    })
    .then(() => {
      fetch(Config.apiUrl + 'users_info', {
        method: 'GET',
        credentials: 'include',
        headers: {
          "Authorization": localStorage.getItem("xsrfToken")
        }
      })
      .then(response => response.json())
      .then(body => {
          body.forEach(function(user){
            arr.push({ value: user.firstName, label: user.firstName + ' ' + user.name, type: "user" })
          })
      })
      .then(() => {
        this.setState({
          options: arr
        })
      })
      .catch(err => {
        console.log("Erreur de chargement de l'API")
      })
    })
    .catch(err => {
      console.log("Erreur de chargement de l'API")
    })
  }

  render() {
    return (
      <Select
        classNamePrefix="react-select"
        placeholder={"Rechercher..."}
        onChange={this.handleChange}
        components={{ DropdownIndicator: () => null, Option: IconOption }}
        options={this.state.options}
        openMenuOnClick={false}
        styles={customStyle}
        getOptionLabel={(option)=>option.label}
        getOptionValue={(option)=>option.value}
      />
    );
  }
}

export default Searchbar;