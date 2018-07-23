const pool = require('../modules/pool');
const axios = require('axios');

function addLatLong(venues) {
    return new Promise(async (resolve, reject) => {
        try {
            let venuesWithLatLong = await getLatLong(venues);
            let updatedVenues = await updateVenues(venuesWithLatLong);
            resolve(updatedVenues);
        } catch (error) {
            reject(error);
        }
    }) 
}

function getLatLong(venues) {
    
    return new Promise(async (resolve, reject) => {
        try {
            let updatedVenueArray = [];
            const processing = venues.filter(venue => venue.lat == null);
            for (let venue of processing){
                await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?`, {
                    params: {
                    address: venue.address,
                    key: process.env.GOOGLE_MAPS_API_KEY
                    }
                })
                .then(response => {
                    let updatedVenue = venue;
                    const geoCodes = response.data.results[0].geometry.location;
                    updatedVenue.lat = geoCodes.lat;
                    updatedVenue.long = geoCodes.lng;
                    // console.log('response after getLat:', response.data.results[0].geometry.location);
                    console.log('updatedVenue', updatedVenue);
                    updatedVenueArray.push(updatedVenue);   
                })
                .catch(error => {
                    console.log(error);
                })
            }
            console.log('updatedVenueArray:', updatedVenueArray); 
            resolve(updatedVenueArray);

        } catch (error) {
            reject(error);
        }
    })
}

function updateVenues(venuesWithLatLong) {
    return new Promise(async (resolve, reject) => {
        try {
            let queryText = 'UPDATE venue SET lat=$1, long=$2 WHERE id=$3;';
            for (let venue of venuesWithLatLong) {
                pool.query(queryText, [venue.lat, venue.long, venue.id])
            }
            queryText = 'SELECT * FROM venue;';
            pool.query(queryText)
            .then(result => {
                resolve(result.rows);
            })
        } catch(error) {
            reject(error);
        }
    })
}

module.exports = addLatLong;