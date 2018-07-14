import axios from 'axios';

export function getVenueInfo(action) {
    console.log('getVenueInfo action:', action);
    return axios.get('api/venue')
        .then(result => result.data)
        .catch(error => {throw error.response || error; });
}

export function updateVenue(action) {
    console.log('updateVenue action payload:', action.payload);
    return axios.put('api/venue/update', action.payload)
        .then(response => response.data)
        .catch((error) => { throw error.response || error; });
}