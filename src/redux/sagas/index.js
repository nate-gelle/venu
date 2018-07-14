import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import venueSaga from './venueSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    venueSaga(),
    // watchIncrementAsync()
  ]);
}
