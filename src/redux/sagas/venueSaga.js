import { put, takeLatest } from 'redux-saga/effects';
import {updateVenue} from '../requests/venueRequests';
import {getVenueInfo} from '../requests/venueRequests';
import {VENUE_ACTIONS} from '../actions/venueActions';

function* putVenue(action) {
    try {
        yield updateVenue(action);
        yield put({type:VENUE_ACTIONS.GET});
    } catch (error) {
        console.log(error);
    }
}

function* getVenue(action) {
    try {
        const venue = yield getVenueInfo(action);
        yield console.log('venue is:', venue)
        yield put({type: VENUE_ACTIONS.STORE, payload: venue});
    } catch (error) {
        console.log(error);
    }
}

function* venueSaga() {
    yield takeLatest(VENUE_ACTIONS.UPDATE, putVenue);
    yield takeLatest(VENUE_ACTIONS.GET, getVenue);
}
  
export default venueSaga;