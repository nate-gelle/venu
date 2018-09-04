import React, { Component } from 'react';
import {VENUE_ACTIONS} from '../../redux/actions/venueActions';
import { connect } from 'react-redux';
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
    height: "100px",
    lineHeight: "100px",
    width: "100%",
    fontSize: "80px",
    backgroundColor: "slategrey",
    color: "white",
    position: "static",
    top: 0,
    left: 0,
  },
});

class VenueEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: '',  
      url: '',
      address: '',
      phone: '',
      outdoor: '',
      price: '',
      image_url: '',
      message: '',
    };
  }

  updateProfile = (event) => {
    event.preventDefault();
    this.props.dispatch({type: VENUE_ACTIONS.UPDATE, payload: this.state});
    this.setState({
      category: '',  
      url: '',
      address: '',
      phone: '',
      outdoor: '',
      price: '',
      image_url: '',
      message: '',
    });
    this.props.history.push('vprofile');
  } // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  cancel = (event) => {
    event.preventDefault();
    this.props.history.push('vprofile');
  }

  renderAlert = () => {
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
        <FormControl className={classes.form}>
          <TextField
            type="text"
            id="category"
            placeholder="category"
            name="category"
            value={this.state.category}
            onChange={this.handleInputChangeFor('category')}
          />
          <br/>
          <TextField
            type="text"
            id="url"
            placeholder="url"
            name="url"
            value={this.state.url}
            onChange={this.handleInputChangeFor('url')}
          />
          <br/>
          <TextField
            type="text"
            id="address"
            placeholder="address"
            name="address"
            value={this.state.address}
            onChange={this.handleInputChangeFor('address')}
          />
          <br/>
          <TextField
            type="text"
            id="phone"
            placeholder="phone"
            name="phone"
            value={this.state.phone}
            onChange={this.handleInputChangeFor('phone')}
          />
          <br/>
          <TextField
            type="text"
            id="coverPhoto"
            placeholder="cover photo url"
            name="coverPhoto"
            value={this.state.image_url}
            onChange={this.handleInputChangeFor('image_url')}
          />
          <br/>
          <TextField
            type="text"
            id='outdoor'
            name="outdoor"
            placeholder="outdoor seating?"
            value={this.state.outdoor}
            onChange={this.handleInputChangeFor('outdoor')}
          />
          <br/>
          <TextField
            type="text"
            id="price"
            name="price"
            placeholder="$-$$$"
            value={this.state.price}
            onChange={this.handleInputChangeFor('price')}
          />
          <br/>
          <br/>
          <Button onClick={this.updateProfile} variant="contained">Save Changes</Button>
          <Button onClick={this.cancel} variant="contained">Cancel</Button>
        </FormControl>
      </div>
    );
  }
}

VenueEditor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles),connect())(VenueEditor);
