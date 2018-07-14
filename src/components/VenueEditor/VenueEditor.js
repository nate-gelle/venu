import React, { Component } from 'react';
import {VENUE_ACTIONS} from '../../redux/actions/venueActions';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

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
    return (
      <div>
        {this.renderAlert()}
        <Button onClick={this.cancel}>
          Cancel
        </Button>
        <form onSubmit={this.updateProfile}>
          <div>
              <input
                type="text"
                name="category"
                placeholder="category"
                value={this.state.category}
                onChange={this.handleInputChangeFor('category')}
              />
          </div>
          <div>
              <input
                type="text"
                name="url"
                placeholder="url"
                value={this.state.url}
                onChange={this.handleInputChangeFor('url')}
              />
          </div>
          <div>
              <input
                type="text"
                name="address"
                placeholder="address"
                value={this.state.address}
                onChange={this.handleInputChangeFor('address')}
              />
          </div>
          <div>
              <input
                type="text"
                name="phone"
                placeholder="phone"
                value={this.state.phone}
                onChange={this.handleInputChangeFor('phone')}
              />
          </div>
          <div>
              <input
                type="text"
                name="coverPhoto"
                placeholder="image url"
                value={this.state.image_url}
                onChange={this.handleInputChangeFor('image_url')}
              />
          </div>
          <div>
              <input
                type="text"
                name="outdoor"
                placeholder="outdoor seating?"
                value={this.state.outdoor}
                onChange={this.handleInputChangeFor('outdoor')}
              />
          </div>
          <div>
              <input
                type="text"
                name="price"
                placeholder="$-$$$"
                value={this.state.price}
                onChange={this.handleInputChangeFor('price')}
              />
          </div>
          <div>
            <input
              type="submit"
              name="submit"
              value="Save Changes"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(VenueEditor);
