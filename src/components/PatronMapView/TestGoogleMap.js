import React, {Component} from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

// const key = process.env.GOOGLE_MAPS_API_KEY;
// console.log(key);

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyDSEgfxONgI6yzRnVIaEuQOrxW_xiz8gPk&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={17}
    defaultCenter={{ lat: 44.978041, lng: -93.263187 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 44.978041, lng: -93.263187 }} onClick={props.onMarkerClick} />}
  </GoogleMap>
)

class GoogleMaps extends Component {
    constructor(props){
        super(props);
        this.state = {
            isMarkerShown: false,
            address: this.props.address,
        }
    }
    
    componentDidMount() {
        this.delayedShowMarker();
        console.log('address passed to maps:', this.state.address);
    }

    delayedShowMarker = () => {
        setTimeout(() => {
        this.setState({ isMarkerShown: true })
        }, 1000)
    }

    handleMarkerClick = () => {
        this.setState({ isMarkerShown: false })
        this.delayedShowMarker()
    }

    render() {
        return (
        <MyMapComponent
            isMarkerShown={this.state.isMarkerShown}
            onMarkerClick={this.handleMarkerClick}
        />
        )
    }
}

export default compose(withProps())(GoogleMaps);