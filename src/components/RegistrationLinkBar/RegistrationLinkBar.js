import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import '../RegistrationLinkBar/RegistrationLinkBar.css';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function RegistrationLinkBar(props) {
    const { classes } = props;
    return (
      <div className={classes.root}>
        <AppBar id="appbar" position="static" color="default">
          <Toolbar>
            <Typography id="question" variant="title" color="inherit">
              New to Venu?  
            </Typography> 
            <Typography variant="title" color="inherit">
              <Link to="/welcome">Sign up</Link> 
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  
  RegistrationLinkBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(RegistrationLinkBar);