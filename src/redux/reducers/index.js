import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import venue from './venueReducer';

const store = combineReducers({
  user,
  login,
  venue,
});

export default store;
