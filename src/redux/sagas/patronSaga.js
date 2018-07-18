import { put, takeLatest } from 'redux-saga/effects';
import {getVenueData} from '../requests/patronRequests';
import {postCheckIn} from '../requests/patronRequests';
import {checkOutReq} from '../requests/patronRequests';
import {getSearchRequest} from '../requests/patronRequests';
import {postNewFriendship} from '../requests/patronRequests';
import {getCheckInData} from '../requests/patronRequests';
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
        yield put({type: PATRON_ACTIONS.PGET});
        yield put({type: PATRON_ACTIONS.FETCH_CHECKINS});
    } catch (error) {
        console.log(error);
    }
}

function* checkOutSaga(action) {
    try {
        yield checkOutReq(action);
        yield put({type: PATRON_ACTIONS.FETCH_CHECKINS});
        yield put({type: PATRON_ACTIONS.PGET});
    } catch (error) {
        console.log(error);
    }
}

function* getSearchResults(action) {
    try {
        const searchResults = yield getSearchRequest(action);
        yield console.log('searchResults are:', searchResults);
        yield put ({type: PATRON_ACTIONS.STORE_SEARCH_RESULTS, payload: searchResults});
    } catch (error) {
        console.log(error);
    }
}

function* addFriend(action) {
    try {
        yield console.log('in addFriend in saga, action = ', action)
        yield postNewFriendship(action);
    } catch (error) {
        console.log(error);
    }
}

function* getCheckIns(action) {
    try {
        const checkInData = yield getCheckInData(action);
        console.log('checkInData=', checkInData);
        yield put ({type: PATRON_ACTIONS.STORE_CHECKINS, payload: checkInData});
    } catch (error) {
        console.log(error);
    }
}

function* patronSaga() {
    yield takeLatest(PATRON_ACTIONS.PGET, getVenues);
    yield takeLatest(PATRON_ACTIONS.CHECK_IN, checkIn);
    yield takeLatest(PATRON_ACTIONS.CHECK_OUT, checkOutSaga);
    yield takeLatest(PATRON_ACTIONS.SEARCH, getSearchResults);
    yield takeLatest(PATRON_ACTIONS.ADD_FRIEND, addFriend);
    yield takeLatest(PATRON_ACTIONS.FETCH_CHECKINS, getCheckIns);
}
  
export default patronSaga;