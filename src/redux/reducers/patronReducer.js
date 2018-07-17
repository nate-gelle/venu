import { combineReducers } from 'redux';
import {PATRON_ACTIONS} from '../actions/patronActions';

const venueData = (state = [], action) => {
    switch (action.type) {
        case PATRON_ACTIONS.PSTORE:
            return action.payload || state;    
    default:
        return state;
    }
};

const searchResults = (state = [], action) => {
    switch (action.type) {
        case PATRON_ACTIONS.STORE_SEARCH_RESULTS:
            return action.payload || state;        
    default:
        return state;
    }
};

export default combineReducers({
    venueData,
    searchResults,
})