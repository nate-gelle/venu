import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import Typography from '@material-ui/core/Typography';

const mapStateToProps = state => ({
    user: state.user,
    venues: state.patron.venueData,
});

// const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

class MultiVenueMapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latLng: {
                lat: 44.978041, 
                lng: -93.263187,
            },
            zoom: 12,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        };
    }

    

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

    render() {

        let venues = this.props.venues;
        let venueMarkers = venues.map((venue, i) => {
            return (
                <Marker key={i} position={{ lat: venue.lat, lng: venue.long }} title={venue.name} name={venue.name} onClick={this.onMarkerClick}/>
            )
        });

        return (

            <div className="mapContainer">
                <Map
                    google={this.props.google}
                    zoom={this.state.zoom}
                    initialCenter={this.state.latLng}
                    onClick={this.onMapClicked}
                >
                    {venueMarkers}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                    >
                        <div>
                        <Typography>{this.state.selectedPlace.name}</Typography>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        )
    }
}

const connectToGoogleMaps = GoogleApiWrapper({
    apiKey: ('AIzaSyDSEgfxONgI6yzRnVIaEuQOrxW_xiz8gPk')
})(MultiVenueMapContainer)

export default connect(mapStateToProps)(connectToGoogleMaps);