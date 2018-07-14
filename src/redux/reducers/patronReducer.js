import { combineReducers } from 'redux';
import {PATRON_ACTIONS} from '../actions/patronActions';

const venueData = (state = {}, action) => {
    switch (action.type) {
        case PATRON_ACTIONS.STORE:
            return action.payload || state;    
    default:
        return state;
    }
};    

export default combineReducers({
    venueData,
})