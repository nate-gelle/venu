import { combineReducers } from 'redux';
import {VENUE_ACTIONS} from '../actions/venueActions';

const venueProfileInfo = (state = {}, action) => {
    switch (action.type) {
        case VENUE_ACTIONS.STORE:
            return action.payload || state;    
    default:
        return state;
    }
};    

export default combineReducers({
    venueProfileInfo,
})