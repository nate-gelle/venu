import axios from 'axios';

export function getVenueData(action) {
    console.log('getVenueData action:', action);
    return axios.get('api/patron/venues')
        .then(result => result.data)
        .catch(error => {throw error.response || error; });
}

export function postCheckIn(action) {
    console.log('postCheckIn action:', action);
    return axios.post(`api/patron/checkin/${action.payload}`)
        .then(result => {
            console.log(result.data);
        })
        .catch(error => {throw error.response || error; });
}

export function checkOutReq() {
    console.log('in checkOutReq');
    return axios.delete('api/patron')
        .then(result => {
            console.log('successful delete');
        })
        .catch(error => {throw error.response || error; });
}

export function getSearchRequest(action) {
    console.log('getSearchRequest action:', action);
    return axios.get(`api/patron/${action.payload}`)
        .then((result) => {
            console.log('in getSearchReq, result:', result.data);
            return result.data;
        }).catch(error => {throw error.response || error; })
}

export function postNewFriendship(action) {
    console.log('postNewFriendship action:', action);
    return axios.post(`api/patron/friend/${action.payload}`)
        .then(result => {
            console.log(result.data);
        })
        .catch(error => {throw error.response || error; })
}