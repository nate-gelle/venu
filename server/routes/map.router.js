const express = require('express');
const router = express.Router();
const axios = require('axios');
const addLatLong = require('../modules/addLatLong');

const getGeocode = (venueObject) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?`, {
      params: {
        address: venueObject.address,
        key: process.env.GOOGLE_MAPS_API_KEY
      }
    }).then(response => {
      const geoCodes = response.data.results[0].geometry.location;
      venueObject.lat = geoCodes.lat;
      venueObject.lng = geoCodes.lng;
      resolve(venueObject);
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  })
}

// router.put('/geocode', (req, res) => {
//   (async () => {
//     try {
//       const appointments = await Appointment.find({});
//       let appointmentsWithGeocodes = [];
//       for (let i = 0; i < appointments.length; i++) {
//         const geocodedAppointment = await getGeocode(appointments[i]);
//         appointmentsWithGeocodes.push(geocodedAppointment);
//       };
//       for (let i = 0; i < appointmentsWithGeocodes.length; i++) {
//         let appointmentToUpdate = appointmentsWithGeocodes[i];
//         await Appointment.update({ _id: appointmentToUpdate._id }, appointmentToUpdate);
//       }
//       res.sendStatus(201);
//     } catch (error) {
//       throw error;
//     }
//   })().catch(error => {
//     console.log(error);
//     res.sendStatus(500);
//   });
// });

router.post('/', (req, res) => {
  const venues = req.body;
  addLatLong(venues)
})

module.exports = router;