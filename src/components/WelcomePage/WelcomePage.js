import React, { Component } from 'react';
import {connect} from 'react-redux';
import LogInLinkBar from '../LogInLinkBar/LogInLinkBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {compose} from 'redux';

const styles = theme => ({
  venu: {
    height: "300px",
    lineHeight: "300px",
    width: "100%",
    fontSize: "80px",
    backgroundColor: "slategrey",
    color: "white",
    position: "static",
    top: 0,
    left: 0,
  },
  buttons: {
    height: "100px",
    lineHeight: "100px",
    width: "50%",
    display: "block",
    margin: "auto",
  }
});

class WelcomePage extends Component {

    handleClick = type => (event) => {
      this.props.history.push(`/${type}`);
    }

    render() {
      const { classes } = this.props;
      return(
        <div>
          <Typography align="center" variant="headline" className={classes.venu}>Venu</Typography>
          <div className={classes.buttons}>
            <Button variant="contained" onClick={this.handleClick('regpatron')}>Patron</Button>
            <Button variant="contained" onClick={this.handleClick('regvenue')}>Venue</Button>
          </div>
          <LogInLinkBar />
        </div>
      );
    }
}

WelcomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles),connect())(WelcomePage);