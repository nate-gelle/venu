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

// const checkInData = (state = 0, action) => {
//     switch (action.type) {
//         case PATRON_ACTIONS.STORE_CHECK_IN:
//             return action.payload;        
//     default:
//         return state;
//     }
// };

export default combineReducers({
    venueData,
    // checkInData,
})