import React, { Component } from 'react';
import { connect } from 'react-redux';
import VenueProfileCard from '../VenueProfileCard/VenueProfileCard';
import '../VenueProfile/VenueProfile.css';
import Button from '@material-ui/core/Button';

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
            <p id="username">{this.props.user.userName}</p>
            <br/>
            <Button id="logoutButton" onClick={this.logout}>
                Log Out
            </Button>
            {/* <div id="cover">
                <img alt="venue's cover"/>
            </div> */}
            <VenueProfileCard history={this.props.history}/>
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

