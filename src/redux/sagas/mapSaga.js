// import { put, takeEvery } from 'redux-saga/effects';
// import { MAP_ACTIONS } from '../actions/mapActions';
// import {getVenueData} from '../requests/patronRequests';

// function* getLatLong() {
//   try {
//     const venues = yield getVenueData();
//     yield console.log('venues are:', venues);
//   } catch (error) {
//     console.log(error);
//   }
// }

// function* mapSaga() {
//     yield takeEvery(MAP_ACTIONS.GET_DATA, getLatLong);
// }

// export default mapSaga;