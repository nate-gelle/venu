import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const mapStateToProps = state => ({
    user: state.user,
    // reduxState: state,
});

// const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

class MultiVenueMapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latLng: {
                lat: 44.986656,
                lng: -93.258133,
            },
            zoom: 11,
        };
    }

    render() {

        let venues = this.props.reduxState.mapData.mapData;
        let placeDisplayOnMarker = venues.map((venue, i) => {
            return (
                <Marker key={i} position={{ lat: venue.lat, lng: venue.lng }} icon={venue.marker} />
            )
        });

        return (

            <div className="mapContainer">
                <Map
                    google={this.props.google}
                    zoom={this.state.zoom}
                    initialCenter={this.state.latLng}
                >
                    {placeDisplayOnMarker}
                </Map>
            </div>
        )
    }
}

const connectToGoogleMaps = GoogleApiWrapper({
    apiKey: ('AIzaSyDSEgfxONgI6yzRnVIaEuQOrxW_xiz8gPk')
})(MultiVenueMapContainer)

export default connect(mapStateToProps)(connectToGoogleMaps)