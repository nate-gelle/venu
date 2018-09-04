import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
    user: state.user,
});

class VenueSettings extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }
    
    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
          this.props.history.push('login');
        }
    }
    
    logout = () => {
        this.props.dispatch(triggerLogout());
        this.props.history.push('login');
    }

    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <Button id="logoutButton" variant="contained" onClick={this.logout}>
                        Log Out
                    </Button>
        </div>
      );
    }

    return (
      <div>
        { content }
      </div>
    );
    }
}

export default connect(mapStateToProps)(VenueSettings);