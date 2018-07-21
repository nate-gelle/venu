import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import venueSaga from './venueSaga';
import patronSaga from './patronSaga';
import mapSaga from './mapSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    venueSaga(),
    patronSaga(),
    mapSaga(),
    // watchIncrementAsync()
  ]);
}
