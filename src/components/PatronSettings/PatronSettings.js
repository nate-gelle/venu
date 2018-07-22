import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
// import {PATRON_ACTIONS} from '../../redux/actions/patronActions';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import SettingsIcon from '@material-ui/icons/Settings';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const mapStateToProps = state => ({
    user: state.user,
});

const styles = theme => ({
    settingsButton: {
        color: 'white',
        display: 'inline',
    }
});

class PatronSettings extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
        };
    }

    openSettings = () => {
        this.setState(state => ({ open: !state.open }));
    }

    handleClose = () => {
        this.setState({ open: false });
    }

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
        const { classes } = this.props;
        return (
            <div>
                <IconButton onClick={this.openSettings} className={classes.settingsButton} id="settingsButton">
                    <SettingsIcon />
                </IconButton>                
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Settings</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.props.user.userName? this.props.user.userName.username : null}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.logout} color="primary" id="logoutButton">
                            <Icon>meeting_room</Icon>logout
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

PatronSettings.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles),connect(mapStateToProps))(PatronSettings);