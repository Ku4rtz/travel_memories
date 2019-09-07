import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"
import ReactTooltip from "react-tooltip"
import jsonWorldMap from "../../maps/world-50m.json"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Config from "../../Config"
import './styles.css'
import Background from '../../css/img/BACKGROUND_MAPS.png';
import ModalCountry from '../ModalCountry';
import Loader from 'react-loader-spinner';
import Header from '../Header';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class WorldMap extends Component {
  constructor(props){
    super()

    this._child = React.createRef();

    this.state = {
      zoom: 1,
      color: "rgba(255, 255, 255, 0.8)",
      countries: jsonWorldMap,
      dataFetched: false,
      modalTitle: "",
      userbirthDate: "",
      userCountries: [],
      userEmail:"",
      userFirstName:"",
      userName:"",
      userSex:"",
      mapLoading: true,
      fade: "",
      alpha3: "",
      countryFocus: []
    }

    this.getDataFromSearchBar = this.getDataFromSearchBar.bind(this);
    this.refreshMap = this.refreshMap.bind(this);
  }

  componentWillMount(){
    setTimeout(() => {
      ReactTooltip.rebuild()
    }, 1)
  }

  componentDidMount() {
    //get all countries in db
    const self = this;
      fetch(Config.apiUrl +'country', {
        method: 'GET',
        credentials: 'include',
        headers:{
          "Authorization": localStorage.getItem("xsrfToken")
        }
      })
      .then(response => response.json())
      .then(body => 
        {
          try{
            body.forEach(function(elementMongo){
              jsonWorldMap.objects.units.geometries.forEach(function(elementJson){
                if(elementMongo.alpha3 === elementJson.id)
                {
                  elementJson.properties.name = elementMongo.name_fr;
                }
              })
            })
            self.setState({ countries: jsonWorldMap, dataFetched: true })
          } catch{
            console.log("Erreur de chargement de l'API")
          }

          fetch(Config.apiUrl + 'thisuser', {
            method: 'GET',
            credentials: 'include',
            headers: {
              "Authorization": localStorage.getItem("xsrfToken")
            }
          })
          .then(response => response.json())
          .then(body => {
            this.setState({
              userbirthDate: body.birthDate,
              userCountries: body.countries,
              userEmail: body.email,
              userFirstName: body.firstName,
              userName: body.name,
              userSex:body.sex
            }, () => {
              this.state.userCountries.forEach(function(country){
                jsonWorldMap.objects.units.geometries.forEach(function(elementJson){
                  if(country.alpha3 === elementJson.id){
                    elementJson.properties.visited = true;
                  }
                })
              })
              this.setState({
                mapLoading: false,
              })
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

  handleZoomOut(){
    this.setState({
      zoom: this.state.zoom / 2,   
    })
  }

  getDataFromSearchBar(data, alpha3){
    this.setState({
      modalTitle: data,
      alpha3: alpha3
    }, () => {
      this._child.current.open()
      this.state.countries.objects.units.geometries.forEach(function(country){
        if(country.id === alpha3)
        {
          country.properties.focused = true;
        }
      })
      this.refreshMap(this.state.countries)
    })
  }

  handleZoomIn(){
    this.setState({
      zoom: this.state.zoom * 2,
    })
  }

  refreshMap(countries){
    this.setState({
      countries: countries
    })
  }

  countryColor(geography){
    if(geography.properties.focused){
      return "#607D8B"
    }
    else if(geography.properties.visited){
      return "rgba(229, 204, 160, 0.8)"
    }
    else
    {
      return this.state.color
    }
  }
  
  countryColorStroke(geography){
    if(geography.properties.focused){
      return "#607D8B"
    }
    else if(geography.properties.visited){
      return "rgba(229, 204, 160, 0.8)"
    }
    else
    {
      return this.state.color
    }
  }

  countryColorHover(geography){
    return geography.properties.focused === true ? "#607D8B" : this.state
  }

  countryColorHoverStroke(geography){
    return "#607D8B"
  }

  openModalBox(geography){
    geography.properties.focused = true;
    this.setState({
      countryFocus: geography,
      modalTitle: geography.properties.name,
      alpha3: geography.id
    }, () => {
      this._child.current.open();
    })
  }
              
  render() {

    var loader = 
      <div className="loader">
        <Loader
          type="Plane"
          color="rgba(255, 255, 255, 0.8)"
        >
        </Loader>
      </div>

    var notMapView =
      <ComposableMap
        projectionConfig={{
          scale: 175,
        }}
        width={980}
        height={440}
        style={{
          width: "100%",
          height: "auto",
        }}
      >
        <ZoomableGroup center={[0,20]} zoom={this.state.zoom}>
        </ZoomableGroup>                     
      </ComposableMap>

    var mapView =
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        <div className="mapView">
          <ComposableMap
              projectionConfig={{
              scale: 175,
            }}
            width={980}
            height={440}
            style={{
              width: "100%",
              height: "auto",
            }}
          >                     
            <ZoomableGroup center={[0,20]} zoom={this.state.zoom}>
              <Geographies geography={this.state.countries} disableOptimization>
                {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                <Geography
                  className="Geography"
                  key={i}
                  onClick={() => this.openModalBox(geography)}
                  geography={geography}
                  data-tip={geography.properties.name}
                  projection={projection}
                  style={
                    {
                      default: {
                        fill: this.countryColor(geography),
                        stroke: this.countryColorStroke(geography),
                        strokeWidth: 0.30,
                        outline: "none"
                      },
                      hover: {
                        fill: "#607D8B",
                        stroke: "#607D8B",
                        strokeWidth: 0.75,
                        outline: "none",
                        cursor: "pointer"
                      },
                      pressed: {
                        fill: "#FFFFFF",
                        stroke: "#FFFFFF",
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                    }
                  }
                />
                ))}
              </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          </div>
          <ReactTooltip />
        </ReactCSSTransitionGroup>

      return(
        <div className='wrapperStyles'>
          <Header openModal={this.getDataFromSearchBar} />
          <ModalCountry ref={this._child} countries={this.state.countries} refreshMap={this.refreshMap} modalTitle={this.state.modalTitle} alpha3={this.state.alpha3} />
          <div           
            onWheel={event => {
              if(event.nativeEvent.wheelDelta > 0 && event.ctrlKey === true)
              {
                event.preventDefault()
                this.handleZoomIn()
              }
              else if(event.ctrlKey === true){
                event.preventDefault()
                this.handleZoomOut()
              }
            }}>
            <div style={{width: "10%"}}> 
              <button data-tip="Utilisez Ctrl + molette de la souris pour plus d'ergonomie !" onClick={() => this.handleZoomOut()}><FontAwesomeIcon icon="search-minus" /></button>
              <button data-tip="Utilisez Ctrl + molette de la souris pour plus d'ergonomie !" onClick={() => this.handleZoomIn()}><FontAwesomeIcon icon="search-plus" /></button>
            </div>
            {this.state.mapLoading ? loader : null}
            {this.state.mapLoading ? notMapView : mapView}
          </div>
        </div>
      )
    }
}

export default WorldMap