import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { USER_ACTIONS } from '../../redux/actions/userActions';
// import { MAP_ACTIONS } from '../../redux/actions/mapActions';
import MultiVenueMapContainer from './MultiVenueMapContainer';
import './map.css';

const mapStateToProps = state => ({
    user: state.user,
    reduxState: state
});

class PatronMapView extends Component {
  // constructor(props) {
  //     super(props);
  // }

  render() {
    return (
      <div className="mapView">
        <div className="wrapper">
            <MultiVenueMapContainer />
        </div>
      </div>  
    );
  }
}

export default connect(mapStateToProps)(PatronMapView);