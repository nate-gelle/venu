import axios from 'axios';

export function getVenueData(action) {
    console.log('getVenueData action:', action);
    return axios.get('api/patron')
        .then(result => result.data)
        .catch(error => {throw error.response || error; });
}

export function putCheckIn(action) {
    console.log('putCheckIn action:', action);
    return axios.put('api/patron')
        .then(result => result.data)
        .catch(error => {throw error.response || error; });
}