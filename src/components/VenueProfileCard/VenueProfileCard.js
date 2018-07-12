import React from 'react';
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
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
};

// class VenueProfileCard extends

// openEditor = (event) => {
//     this.props.history.push('editvenue');
// }

function VenueProfileCard(props) {
    const { classes } = props;
    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              Venue Name
            </Typography>
            <Button onClick={this.openEditor()}>
                <Icon class="material-icons">
                    edit
                </Icon>
            </Button>    
            <Typography component="p">
              Information
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Post
            </Button>
            <CardMedia
                className={classes.media}
                image="https://res.cloudinary.com/dqadknr5p/image/upload/v1531415713/Venue%20Profile/CPdummyMap.png"
                title="CP Dummy Map"
            />
          </CardActions>
        </Card>
      </div>
    );
  }
  
  VenueProfileCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(VenueProfileCard);