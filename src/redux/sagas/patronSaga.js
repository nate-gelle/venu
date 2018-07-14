import { put, takeLatest } from 'redux-saga/effects';
import {getVenueData} from '../requests/patronRequests';
import {PATRON_ACTIONS} from '../actions/patronActions';

function* getVenues(action) {
    try {
        const venue = yield getVenueData(action);
        yield console.log('venue is:', venue)
        yield put({type: PATRON_ACTIONS.STORE, payload: venue});
    } catch (error) {
        console.log(error);
    }
}

function* patronSaga() {
    yield takeLatest(PATRON_ACTIONS.GET, getVenues);
}
  
export default patronSaga;