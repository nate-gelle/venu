import axios from 'axios';

export function getVenueLatLong(venues) {
  return axios.post('api/map/', venues)
  .then(result => result.data)
  .catch(error => {throw error.response || error; });
}