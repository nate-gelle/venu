import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
  },
};

function RegistrationLinkBar(props) {
    const { classes } = props;
    return (
      <div className={classes.root}>
        <AppBar id="appbar" position="static" color="default" align="center">
          <Toolbar>
            <Typography id="question" variant="subheading" color="inherit" display="inline">
              New to Venu?  
            </Typography> 
            <Button color="inherit">
              <Link to="/welcome">sign up</Link>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  
  RegistrationLinkBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(RegistrationLinkBar);