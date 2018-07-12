import React, { Component } from 'react';
import { connect } from 'react-redux';
import VenueProfileCard from '../VenueProfileCard/VenueProfileCard';
import '../VenueProfile/VenueProfile.css';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
  user: state.user,
});

class VenueProfile extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('login');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    this.props.history.push('login');
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
            {/* <p id="username">{this.props.user.userName}</p>
            <div id="cover">
                <img alt="venue's cover" src="{this.props.user.venueProfileInfo.media}"/>
            </div>
            <h1 id="venueName"> 
                Venue Name Goes Here.
            </h1>
            <button onClick={this.logout}>
                Log Out
            </button> */}
            <VenueProfileCard />
        </div>
      );
    }

    return (
      <div>
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(VenueProfile);

