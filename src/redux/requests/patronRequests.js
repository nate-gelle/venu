import axios from 'axios';

export function getVenueData(action) {
    console.log('getVenueData action:', action);
    return axios.get('api/patron/')
        .then(result => result.data)
        .catch(error => {throw error.response || error; });
}

export function postCheckIn(action) {
    console.log('postCheckIn action:', action);
    return axios.post(`api/patron/${action.payload}`)
        .then(result => {
            console.log(result.data);
        })
        .catch(error => {throw error.response || error; });
}

export function checkOutReq() {
    console.log('in checkOutReq');
    return axios.delete('api/patron/')
        .then(result => {
            console.log('successful delete');
        })
        .catch(error => {throw error.response || error; });
}