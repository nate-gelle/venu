import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PatronListView from '../PatronListView/PatronListView';
import PatronSocialView from '../PatronSocialView/PatronSocialView';
import PatronSearch from '../PatronSearch/PatronSearch';
import PatronSettings from '../PatronSettings/PatronSettings';
// import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const mapStateToProps = state => ({
    patrons: state.patron.searchResults,
    user: state.user,
});

const styles = theme => ({
    settingsButton: {
        marginRight: '0%',
    root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
          },    
    },
    tabs: {
        display: 'inline-block',
        margin: 'auto',
    }
});

function TabContainer(props){
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class PatronHome extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: 0,
        };
    }
    

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <PatronSearch />
                        <Tabs value={value} onChange={this.handleChange} className={classes.tabs}>
                            <Tab icon={<Icon>list</Icon>} label="List"/>
                            <Tab icon={<Icon>people</Icon>} label="Social" />
                        </Tabs>
                    <PatronSettings history={this.props.history} user={this.props.user} />
                </AppBar>
                {value === 0 && <TabContainer><div><PatronListView /></div></TabContainer>}
                {value === 1 && <TabContainer><div><PatronSocialView /></div></TabContainer>}
            </div>  
        );
    }
}

PatronHome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles),connect(mapStateToProps))(PatronHome);