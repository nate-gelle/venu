import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import 'typeface-roboto';
import '../LogInLinkBar/LogInLinkBar.css';

const styles = {
  root: {
    position: "absolute",
    bottom: "0px",
    width: "100%",
  },
};

function LogInLinkBar(props) {
    const { classes } = props;
    return (
      <div className={classes.root}>
        <AppBar id="appbar" position="static" color="default" align="center">
          <Toolbar>
            <Typography variant="subheading" color="inherit">
              Already have an account? 
            </Typography>
            <Button color="inherit">
              <Link to="/login"> sign in</Link> 
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  
  LogInLinkBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(LogInLinkBar);