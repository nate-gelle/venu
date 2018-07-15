import { put, takeLatest } from 'redux-saga/effects';
import {getVenueData} from '../requests/patronRequests';
import {PATRON_ACTIONS} from '../actions/patronActions';

function* getVenues(action) {
    try {
        const venues = yield getVenueData(action);
        yield console.log('venues are:', venues);
        yield put({type: PATRON_ACTIONS.PSTORE, payload: venues});
    } catch (error) {
        console.log(error);
    }
}

function* checkIn(action) {
    try {
        const checkInData = yield putCheckIn(action);
        yield console.log('checkInData is:', checkInData);
        yield put({type: PATRON_ACTIONS.STORE_CHECK_IN, payload: checkInData})
    } catch (error) {
        console.log(error);
    }
}

function* patronSaga() {
    yield takeLatest(PATRON_ACTIONS.PGET, getVenues);
    yield takeLatest(PATRON_ACTIONS.CHECK_IN, checkIn);
}
  
export default patronSaga;