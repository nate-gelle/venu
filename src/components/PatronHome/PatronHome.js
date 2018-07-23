import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PatronListView from '../PatronListView/PatronListView';
import PatronSocialView from '../PatronSocialView/PatronSocialView';
import PatronMapView from '../PatronMapView/PatronMapView';
import PatronSearch from '../PatronSearch/PatronSearch';
import PatronSettings from '../PatronSettings/PatronSettings';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {PATRON_ACTIONS} from '../../redux/actions/patronActions';
import {USER_ACTIONS} from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    patrons: state.patron.searchResults,
    venues: state.patron.venueData,
    user: state.user,
});

const styles = theme => ({
    root: {
        flexGrow: 0,
        backgroundColor: theme.palette.background.paper,
    },
    appbar: {
        backgroundColor: 'slategrey',
        position: 'static',
        top: 0,
        left: 0,
        margin: 'auto',
    },
    search: {
        display: 'inline-block',
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
    
    componentDidMount(){
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: PATRON_ACTIONS.PGET });
        this.props.dispatch({ type: PATRON_ACTIONS.FETCH_CHECKIN });
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        return (
            <div className={classes.root}>
                <AppBar className={classes.appbar}>
                    <PatronSearch className={classes.search}/>
                        <Tabs value={value} onChange={this.handleChange} className={classes.tabs}>
                            <Tab icon={<Icon>list</Icon>} label="List"/>
                            <Tab icon={<Icon>map</Icon>} label="Map" />
                            <Tab icon={<Icon>people</Icon>} label="Social" />
                        </Tabs>
                    <PatronSettings className={classes.settings} history={this.props.history} user={this.props.user} />
                </AppBar>
                {value === 0 && <TabContainer><div><PatronListView /></div></TabContainer>}
                {value === 1 && <TabContainer><div><PatronMapView /></div></TabContainer>}
                {value === 2 && <TabContainer><div><PatronSocialView /></div></TabContainer>}
            </div>  
        );
    }
}

PatronHome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles),connect(mapStateToProps))(PatronHome);