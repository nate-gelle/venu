import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import venue from './venueReducer';
import patron from './patronReducer';

const store = combineReducers({
  user,
  login,
  venue,
  patron,
});

export default store;
