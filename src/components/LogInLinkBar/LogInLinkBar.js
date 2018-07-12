import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import '../LogInLinkBar/LogInLinkBar.css';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function LogInLinkBar(props) {
    const { classes } = props;
    return (
      <div className={classes.root}>
        <AppBar id="appbar" position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Already have an account? 
            </Typography>
            <Typography variant="title" color="inherit">
              <Link to="/login"> Sign in.</Link> 
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  
  LogInLinkBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(LogInLinkBar);