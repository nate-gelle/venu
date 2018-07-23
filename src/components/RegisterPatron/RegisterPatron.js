import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {compose} from 'redux';

const styles = theme => ({
  form: {
    display: "block",
    margin: "auto",
    textAlign: "center",
  },
  venu: {
    height: "250px",
    lineHeight: "250px",
    width: "100%",
    fontSize: "80px",
    backgroundColor: "slategrey",
    color: "white",
    position: "static",
    top: 0,
    left: 0,
  },
  title: {
    padding: '10px',
  }
});

class RegisterPatron extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first: '',
      last: '',
      username: '',
      password: '',
      type: 'patron',
      message: '',
    };
  }

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '' || this.state.password === '') {
      this.setState({
        message: 'Choose a username, password, and select your user type!',
      });
    } else {
      const body = {
        first: this.state.first,
        last: this.state.last,
        username: this.state.username,
        password: this.state.password,
        type: this.state.type,
      };

      // making the request to the server to post the new user's registration
      axios.post('/api/user/register/', body)
        .then((response) => {
          if (response.status === 201) {
            this.props.history.push('/login');
          } else {
            this.setState({
              message: 'Ooops! That didn\'t work. The username might already be taken. Try again!',
            });
          }
        })
        .catch(() => {
          this.setState({
            message: 'Ooops! Something went wrong! Is the server running?',
          });
        });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  cancel = (event) => {
    this.props.history.push('/login');
  }

  renderAlert() {
    if (this.state.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.state.message}
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.renderAlert()}
        <Typography align="center" variant="headline" className={classes.venu}>Venu</Typography>
        <Typography align="center" variant="headline" className={classes.title}>Patron Registration</Typography>
        <FormControl className={classes.form}>
          <TextField
            type="text"
            id="first"
            placeholder="first name"
            name="first"
            value={this.state.first}
            onChange={this.handleInputChangeFor('first')}
            label="first"
          />
          <br/>
          <TextField
            type="text"
            id="last"
            placeholder="last name"
            name="last"
            value={this.state.last}
            onChange={this.handleInputChangeFor('last')}
            label="last"
          />
          <br/>
          <TextField
            required
            type="text"
            id="username"
            placeholder="username"
            name="username"
            value={this.state.username}
            onChange={this.handleInputChangeFor('username')}
            label="username"
          />
          <br/>
          <TextField
            required
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleInputChangeFor('password')}
            label="password"
          />
          <br/>
          <br/>
          <Button onClick={this.registerUser} variant="contained">Register</Button>
          <Button onClick={this.cancel} variant="contained">Cancel</Button>
        </FormControl>
      </div>
    );
  }
}

RegisterPatron.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles))(RegisterPatron);