import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {PATRON_ACTIONS} from '../../redux/actions/patronActions';
import {USER_ACTIONS} from '../../redux/actions/userActions';
import PatronSearch from '../PatronSearch/PatronSearch';
import PatronListViewCard from '../PatronListViewCard/PatronListViewCard';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import './PatronListView.css';

const mapStateToProps = state => ({
  venues: state.patron.venueData,
  checkIns: state.patron.checkInData,
  user: state.user,
});

const styles = theme => ({
    settingsButton: {
        float: 'left',
    },
    card: {
        width: '100%',
    },
    media: {
        height: '25%',
    },
    distance: {
        float: 'right',
        top: '0',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
});

class PatronListView extends Component {
    constructor (props){
        super(props);
        this.state = {
            open: false,
        };
    }

    openSettings = (event) => {
        event.preventDefault();
        this.props.history.push('psettings');
    }

    componentDidMount(){
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: PATRON_ACTIONS.PGET });
        this.props.dispatch({ type: PATRON_ACTIONS.FETCH_CHECKINS });
    }

    render () {
        const { classes } = this.props;
        let content = null;
        if (this.props.venues === []){
            content = (
                <div>
                    <p>Loading</p>
                </div>
            );
        } else {  
            content = (
                <div>
                    <Button onClick={this.openSettings} id="settingsButton" className={classes.settingsButton}>
                        <Icon>
                            settings
                        </Icon>                
                    </Button>
                    <PatronSearch />   
                    {this.props.venues.map((venue, i) =>
                        <div key={i}> 
                            <PatronListViewCard handleExpandClick={this.handleExpandClick} openSettings={this.openSettings} venue={venue}/>
                        </div>)}        
                </div>
            );
        }

        return (
        <div>
            {content}
        </div>
        );  
    }   
}

PatronListView.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
export default compose(withStyles(styles),connect(mapStateToProps))(PatronListView);