import React, { Component } from 'react';
import { connect } from 'react-redux';
import VenueProfileCard from '../VenueProfileCard/VenueProfileCard';
import '../VenueProfile/VenueProfile.css';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { USER_ACTIONS } from '../../redux/actions/userActions';

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

  openSettings = (event) => {
    event.preventDefault();
    this.props.history.push('vsettings');
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <Button onClick={this.openSettings} id="settingsButton">
            <Icon>
              settings
            </Icon>                
          </Button>
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

