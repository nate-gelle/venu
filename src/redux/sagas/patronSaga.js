import { put, takeLatest } from 'redux-saga/effects';
import {getVenueData} from '../requests/patronRequests';
import {postCheckIn} from '../requests/patronRequests';
import {checkOutReq} from '../requests/patronRequests';
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
        yield postCheckIn(action);
        yield put({type: PATRON_ACTIONS.PGET})
    } catch (error) {
        console.log(error);
    }
}

function* checkOutSaga(action) {
    try {
        yield checkOutReq(action);
        yield put({type: PATRON_ACTIONS.PGET})
    } catch (error) {
        console.log(error);
    }
}

function* patronSaga() {
    yield takeLatest(PATRON_ACTIONS.PGET, getVenues);
    yield takeLatest(PATRON_ACTIONS.CHECK_IN, checkIn);
    yield takeLatest(PATRON_ACTIONS.CHECK_OUT, checkOutSaga);
}
  
export default patronSaga;