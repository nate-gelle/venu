import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {PATRON_ACTIONS} from '../../redux/actions/patronActions';
import {USER_ACTIONS} from '../../redux/actions/userActions';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const mapStateToProps = state => ({
  venues: state.patron.venueData,
  checkIn: state.patron.checkInData,
  checkIns: state.patron.checkInsData,
  user: state.user,
});

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
      },
      listSection: {
        backgroundColor: 'inherit',
      },
      ul: {
        backgroundColor: 'inherit',
        padding: 0,
      },
});

class PatronSocialView extends Component {
    constructor (props){
        super(props);
        this.state = {
            open: false,
        };
    }

    componentDidMount(){
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: PATRON_ACTIONS.PGET });
        this.props.dispatch({ type: PATRON_ACTIONS.FETCH_CHECKIN });
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
                    {/* <ul>   
                        {this.props.checkIns.map((friend, i) => <li key={friend} ></li>)}
                    </ul> */}
                    <List className={classes.root} subheader={<li />}>
                        <ul className={classes.ul}>
                            <ListSubheader>Friends</ListSubheader>
                            {this.props.checkIns.map((friend, i) => (
                            <ListItem key={i}>
                                <ListItemText primary={friend.username} secondary={friend.name}/>
                            </ListItem>
                            ))}
                        </ul>
                    </List>            
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

PatronSocialView.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
export default compose(withStyles(styles),connect(mapStateToProps))(PatronSocialView);