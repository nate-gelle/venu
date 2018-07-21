import { put, takeEvery } from 'redux-saga/effects';
import { MAP_ACTIONS } from '../actions/mapActions';
import { getMapData} from '../requests/mapRequests';

function* fetchData() {
    try {
        let mapData = yield getMapData()
        mapData = yield addMarkerTo(mapData);
        yield put({
            type: MAP_ACTIONS.SET_DATA,
            payload: mapData,
        });
        yield put({
            type: MAP_ACTIONS.SET_MILES_VIEW_DATA,
            payload: yield constructMilesData(mapData),
        });
    } catch (error) {
        console.log('GET getLatLng error', error);
    }
}

function* addMarkerTo(data){
      let markerData = data;
      let venueMarker = [];// contain objects == {venue, marker}
      let markers = [];// store marker image name
      for (let i = 1; i < venueMarker.length; i++) {
        markers.push(i + '.png');
      }
      let counter = 0;// use to change the marker image for venue
      //looping through the venue data(array)
      for (let i = 0; i < data.length; i++) {
        let venueMarkerIndex = -1;// initialize variable to -1 (false/out of bound)
        //looping through venueMarker to check if marker is assigned to venue already
        for (let j = 0; j < venueMarker.length; j++) {
        //   if (photogMarker[j].photog == markerData[i].calendar) {
            //if photog is assign set the photogMarkerIndex to the current index of j (which represent where the photog marker is store in photogMarker)
            venueMarkerIndex = j;
            break;
        //   }
        }
        //If no marker is assigned to venue (-1 == does not exist in array)
        if (venueMarkerIndex === -1) {
          //Assign a new marker to current venue at i
          venueMarker.push({ venue: markerData[i], marker: markers[counter] })// save assigned marker to venue
          markerData[i].marker = markers[counter];// adding the marker to the venue data array for venue at position i;
          //logic to increment counter so it doesn't go out of bounds
          if (counter === markers.length - 1) {
            counter = 0;
          } else {
            counter++;
          }
        } else {
          // marker is already assigned to venue
          // adding the marker at photogMarkerIndex to the appointment/data data(array) for photog at position i;
          markerData[i].marker = venueMarker[venueMarkerIndex].marker;
        }
      }
      console.log('new data after change', markerData)
      yield markerData;
}

function constructMilesData(locations){
    let venueArray = [];
    // let counter = 0;
    for (let i = 0; i < locations.length; i++) {
      let venueExist = false;
      //check if travel distant is undefine, if so continue to next appointment
      if(locations[i].distanceTo == null){
        locations[i].distanceTo = 0;
      }
      for (let j = 0; j < venueArray.length; j++) {
        if (venueArray[j] === locations[i]) {
          venueExist = true;
          // photogArray[j].miles += appointments[i].travel_distance;
          // console.log('distant i at ' + i, appointments[i].driveDistanceToNextAppointment)
          venueArray[j].miles += parseFloat(locations[i].distanceTo);
          break;
        }
      }
      if (!venueExist) {
        // photogArray.push({ photog: appointments[i].calendar, marker: markers[counter], miles: appointments[i].travel_distance })
        venueArray.push({ venue: locations[i].venue, marker: locations[i].marker , miles: parseFloat(locations[i].distanceTo) })
      }
    }
//End of mileage table only allow one one marker to show and add all the travel distance/mileages of the photog together
    for (let i = 0; i < venueArray.length ; i++) {
    venueArray[i].miles = venueArray[i].miles.toFixed(2);
    }
    return venueArray;
}

function* mapSaga() {
    yield takeEvery(MAP_ACTIONS.GET_DATA, fetchData);
}

export default mapSaga;