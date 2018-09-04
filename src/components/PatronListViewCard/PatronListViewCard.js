import React, {Component} from 'react';
import { compose } from 'redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlaceIcon from '@material-ui/icons/Place';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classnames from 'classnames';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {PATRON_ACTIONS} from '../../redux/actions/patronActions';
import TestGoogleMap from '../PatronMapView/GoogleMap';

const mapStateToProps = state => ({
    checkIn: state.patron.checkInData,
    user: state.user,
});

const styles = theme => ({
    card: {
        width: '100%',
    },
    media: {
        height: '200px',
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

class PatronListViewCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            expanded: false,
        }
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    }

    checkForCheckIn = (venue_id) => {
        console.log(venue_id, this.props.checkIn.venue_person_id, this.props.user.userName.id, this.props.checkIn.patron_person_id)
        if(venue_id === this.props.checkIn.venue_person_id && this.props.user.userName.id === this.props.checkIn.patron_person_id){
            console.log('checkForCheckIn returning true');
            return true;
        } else {
            console.log('checkForCheckIn returning false');
            return false;
        }
    }

    checkIn = (venue_id) => {
        if(this.checkForCheckIn(venue_id)){
            this.props.dispatch({ type: PATRON_ACTIONS.CHECK_OUT });
        }else{
            this.props.dispatch({ type: PATRON_ACTIONS.CHECK_IN, payload: venue_id });
        }
    }

    render () {
        let content = null;
        const { classes } = this.props;
        if (this.props.user.userName === null){
            content = (null);
        } else {
            content = (
                <div>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.media}
                            component="img"
                            src={this.props.venue.image_url}
                            title="venueCover"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="headline" component="h2">
                            {this.props.venue.name}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => this.checkIn(this.props.venue.person_id)} size="small" color="primary"><PlaceIcon />{this.checkForCheckIn(this.props.venue.person_id)? 'Check Out' : 'Check In' }</Button>
                            <IconButton
                                className={classnames(classes.expand, {
                                    [classes.expandOpen]: this.state.expanded,
                                })}
                                onClick={this.handleExpandClick}
                                aria-expanded={this.state.expanded}
                                aria-label="Show more">
                                <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography component="ul">
                                    <li>{this.props.venue.category}</li>
                                    <br/>
                                    <li>{this.props.venue.url}</li>
                                    <br/>
                                    <li>{this.props.venue.address}</li>
                                    <br/>
                                    <li>{this.props.venue.phone}</li>
                                    <br/>
                                    <li>{this.props.venue.outdoor}</li>
                                    <br/>
                                    <li>{this.props.venue.price}</li>
                                </Typography>
                            </CardContent>
                            <TestGoogleMap latitude={this.props.venue.lat} longitude={this.props.venue.long}/>
                        </Collapse>        
                    </Card>      
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

PatronListViewCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles),connect(mapStateToProps))(PatronListViewCard);