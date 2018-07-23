import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

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
        };
    }

    render() {

        let venues = this.props.venues;
        let venueMarkers = venues.map((venue, i) => {
            return (
                <Marker key={i} position={{ lat: venue.lat, lng: venue.long }}/>
            )
        });

        return (

            <div className="mapContainer">
                <Map
                    google={this.props.google}
                    zoom={this.state.zoom}
                    initialCenter={this.state.latLng}
                >
                    {venueMarkers}
                </Map>
            </div>
        )
    }
}

const connectToGoogleMaps = GoogleApiWrapper({
    apiKey: ('AIzaSyDSEgfxONgI6yzRnVIaEuQOrxW_xiz8gPk')
})(MultiVenueMapContainer)

export default connect(mapStateToProps)(connectToGoogleMaps);