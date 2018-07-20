import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {compose} from 'redux';
import {PATRON_ACTIONS} from '../../redux/actions/patronActions';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const mapStateToProps = state => ({
    patrons: state.patron.searchResults,
});

class PatronSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
        };
    }

    openSearch = () => {
        this.setState(state => ({ open: !state.open }));
    }

    runSearch = (event) => {
        event.persist();
        this.props.dispatch({ type: PATRON_ACTIONS.SEARCH, payload: event.target.value })
    }

    addFriend = (id) => {
        let action = { type: PATRON_ACTIONS.ADD_FRIEND, payload: id };
        console.log(action);
        this.props.dispatch( action );
    } 

    handleClose = () => {
        this.setState({ open: false });
    };
    
    render() {
        return (
            <div>
                <Button onClick={this.openSearch} id="searchButton">
                    <Icon>
                        search
                    </Icon>                
                </Button>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Search</DialogTitle>
                    <DialogContent>
                        <TextField
                        autoFocus
                        margin="dense"
                        id="search"
                        type="text"
                        fullWidth
                        onChange={this.runSearch}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Back
                        </Button>
                    </DialogActions>
                    <DialogContentText>
                        <ul>
                            {this.props.patrons.map((patron, i) => <li key={i}>{patron.username}<Button onClick={() => this.addFriend(patron.id)}><Icon>person_add</Icon></Button></li>)}
                        </ul>
                    </DialogContentText>    
                </Dialog>
            </div>
        );
    }
}

export default connect(mapStateToProps)(PatronSearch);