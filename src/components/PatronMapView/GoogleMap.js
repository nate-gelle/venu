import React, {Component} from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { connect } from 'react-redux';

// const key = process.env.GOOGLE_MAPS_API_KEY;
// console.log(key);

const mapStateToProps = state => ({
    user: state.user,
    venues: state.patron.venueData,
});

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
    defaultCenter={{ lat: props.latitude, lng: props.longitude }}
  >
    {props.isMarkerShown && <Marker position={{ lat: props.latitude, lng: props.longitude }} onClick={props.onMarkerClick} />}
  </GoogleMap>
)

class TestGoogleMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            isMarkerShown: false,
            latitude: this.props.latitude,
            longitude: this.props.longitude,
        }
    }
    
    componentDidMount() {
        this.delayedShowMarker();
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
            latitude={this.state.latitude}
            longitude={this.state.longitude}
        />
        )
    }
}

export default compose(withProps(), connect(mapStateToProps))(TestGoogleMap);