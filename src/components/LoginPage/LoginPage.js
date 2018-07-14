import React, { Component } from 'react';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import RegistrationLinkBar from '../RegistrationLinkBar/RegistrationLinkBar';
import Button from '@material-ui/core/Button';
import 'typeface-roboto';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,

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
        this.props.history.push('/plistview')
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

  renderAlert() {
    if (this.props.login.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          { this.props.login.message }
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div>
        { this.renderAlert() }
        <form onSubmit={this.login}>
          <h1>Venu</h1>
          <div>
            <input
              type="text"
              name="username"
              placeholder="username"
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
            />
          </div>
          <div>
            <Button onClick={this.login}>Login</Button>  
          </div>
        </form>
        <RegistrationLinkBar />
      </div>
    );
  }
}

export default connect(mapStateToProps)(LoginPage);
