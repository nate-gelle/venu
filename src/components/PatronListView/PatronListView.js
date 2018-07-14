import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {VENUE_ACTIONS} from '../../redux/actions/venueActions';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import './VenueProfileCard.css';

const styles = {
    card: {
      width: '100%',
    },
    editButton: {
      float: 'right',
    },
    media: {
      height: '25%',
    },
};

const mapStateToProps = state => ({
  venue: state.venue.venueProfileInfo
});

class VenueProfileCard extends Component {
  componentDidMount() {
    this.props.dispatch({ type: VENUE_ACTIONS.GET });
  }
  
  openEditor = () => {
    this.props.history.push('editvenue');
  }
  
  render () {
    const { classes } = this.props;  
    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            component="img"
            src={this.props.venue.image_url}
            title="venueCover"
          />
          <CardContent>
          <Button onClick={this.openEditor} className={classes.editButton}>
                <Icon>
                    edit
                </Icon>
            </Button>
            <Typography gutterBottom variant="headline" component="h2">
              {this.props.venue.name}
            </Typography>    
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
          <CardActions>
            <Button size="small" color="primary">
              Post
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }  
    
}

VenueProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
  export default compose(withStyles(styles),connect(mapStateToProps))(VenueProfileCard);