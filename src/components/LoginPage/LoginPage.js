import React, { Component } from 'react';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import RegistrationLinkBar from '../RegistrationLinkBar/RegistrationLinkBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {compose} from 'redux';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,

});

const styles = theme => ({
  form: {
    display: "block",
    margin: "auto",
    textAlign: "center",
  },
  venu: {
    height: "300px",
    lineHeight: "300px",
    width: "100%",
    fontSize: "80px",
    backgroundColor: "rgb(61, 96, 212)",
    color: "white",
    padding: "20px 0",
  },
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.dispatch(clearError());
  }

  
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.user.userName != null && nextProps.user.userType === 'venue') {
      this.props.history.push('/vprofile');
    } 
    else if (nextProps.user.userName != null && nextProps.user.userType === 'patron') {
        this.props.history.push('/phome');
    }
  }

  login = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  // renderAlert() {
  //   if (this.props.login.message !== '') {
  //     return (
  //       <h2
  //         className="alert"
  //         role="alert"
  //       >
  //         { this.props.login.message }
  //       </h2>
  //     );
  //   }
  //   return (<span />);
  // }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* { this.renderAlert() } */}
        <Typography align="center" variant="headline" className={classes.venu}>Venu</Typography>
        <FormControl onSubmit={this.login} className={classes.form}>
          <TextField
            required
            type="text"
            id="username"
            placeholder="username"
            label="username"
            value={this.state.username}
            onChange={this.handleInputChangeFor('username')}
          />
          <br/>
          <TextField
            required
            type="password"
            id="password"
            placeholder="password"
            label="password"
            value={this.state.password}
            onChange={this.handleInputChangeFor('password')}
          />
          <br/>
          <br/>
          <Button onClick={this.login} variant="contained">Login</Button>
        </FormControl>
        <RegistrationLinkBar />
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles),connect(mapStateToProps))(LoginPage);