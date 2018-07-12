import React, { Component } from 'react';
import {connect} from 'react-redux';
import LogInLinkBar from '../LogInLinkBar/LogInLinkBar';
import Button from '@material-ui/core/Button';

class WelcomePage extends Component {

    handleClick = type => (event) => {
      this.props.history.push(`/${type}`);
    }

    render() {
      return(
        <div>
          <div>
            <Button onClick={this.handleClick('regpatron')}>Patron</Button>
            <Button onClick={this.handleClick('regvenue')}>Venue</Button>
          </div>
          <LogInLinkBar />
        </div>
      );
    }
}

export default connect()(WelcomePage);