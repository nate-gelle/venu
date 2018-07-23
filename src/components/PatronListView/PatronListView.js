import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PatronListViewCard from '../PatronListViewCard/PatronListViewCard';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const mapStateToProps = state => ({
  venues: state.patron.venueData,
  checkIn: state.patron.checkInData,
  user: state.user,
});

const styles = theme => ({
    list: {
        width: '100%',
    }
});

class PatronListView extends Component {
    constructor (props){
        super(props);
        this.state = {
            open: false,
        };
    }

    render () {
        const { classes } = this.props;
        let content = null;
        if (this.props.venues === []){
            content = (null);
        } else {  
            content = (
                <div>   
                    {this.props.venues.map((venue, i) =>
                        <div className={classes.list} key={i}> 
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