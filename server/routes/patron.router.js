const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM venue LEFT JOIN checkins ON person_id = venue_person_id;';
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
      console.log('result.rows:', result.rows);
    }).catch((error) => {
      console.log(error);
    })
});

// router.post('/', (req, res) => {

// });

router.post('/:id', (req,res) => {
  const venue_id = req.params.id;
  console.log(venue_id);
  const patron_id = req.user.id;
  console.log(patron_id);
  const queryText = 'INSERT INTO checkins (venue_person_id, patron_person_id) VALUES ($1, $2);';
  pool.query(queryText, [venue_id, patron_id])
    .then(() => {
      res.sendStatus(200);
    }).catch(() => {
      res.sendStatus(500);
    })
})

router.delete('/', (req, res) => {
  const patron_id = req.user.id;
  console.log(patron_id);
  const queryText = 'DELETE FROM checkins WHERE patron_person_id=$1;';
  pool.query(queryText, [patron_id])
    .then(() => {
      res.sendStatus(200);
      console.log('successfully deleted check in info');
    }).catch(() => {
      res.sendStatus(500);
    })
})

// router.get('/checkin', (req, res) => {
//   const patron_id = req.user.id;
//   const queryText = 'SELECT * FROM checkins WHERE patron_person_id=$1;';
//   pool.query(queryText, [patron_id])
//     .then((result) => {
//       res.send(result.rows)
//       console.log('result.rows:', result.rows);
//     }).catch((error) => {
//       console.log(error);
//     })
// })

module.exports = router;