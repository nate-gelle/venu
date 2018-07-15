import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {PATRON_ACTIONS} from '../../redux/actions/patronActions';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classnames from 'classnames';

const styles = theme => ({
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

const mapStateToProps = state => ({
  venues: state.patron.venueData,
});

class PatronListView extends Component {
    state = {expanded: false};

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    }

    openSettings = (event) => {
        event.preventDefault();
        this.props.history.push('psettings');
    }

    checkIn = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: PATRON_ACTIONS.CHECK_IN })
    }

    componentDidMount(){
        this.props.dispatch({ type: PATRON_ACTIONS.PGET })
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
                    <Button onClick={this.openSettings} id="settingsButton">
                        <Icon>
                            settings
                        </Icon>                
                    </Button>   
                    {this.props.venues.map((venue, i) => 
                        <div key={i}> 
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.media}
                                    component="img"
                                    src={venue.image_url}
                                    title="venueCover"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="headline" component="h2">
                                    {venue.name}
                                    </Typography>
                                    <Typography className={classes.distance} component="p">
                                        [venue.distance]
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={this.checkIn} size="small" color="primary">Check In</Button>
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
                                        <li>{venue.category}</li>
                                        <br/>
                                        <li>{venue.url}</li>
                                        <br/>
                                        <li>{venue.address}</li>
                                        <br/>
                                        <li>{venue.phone}</li>
                                        <br/>
                                        <li>{venue.outdoor}</li>
                                        <br/>
                                        <li>{venue.price}</li>
                                    </Typography>
                                    </CardContent>
                                </Collapse>        
                            </Card>
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