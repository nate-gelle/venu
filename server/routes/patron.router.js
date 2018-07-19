const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/venues', (req, res) => {
  const queryText = 'SELECT * FROM venue;';
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
      console.log('result.rows:', result.rows);
    }).catch((error) => {
      console.log(error);
    })
});

router.get('/search/:search', (req, res) => {
  const search = req.params.search + '%';
  console.log ('req.params.search=', search)
  const queryText = 'SELECT * FROM person WHERE username LIKE $1;';
  pool.query(queryText, [search])
    .then((result) => {
      if (result.rows.length === 0){
        res.send(null);
      } else {
        res.send(result.rows);
        console.log('result.rows:', result.rows);
      }
    }).catch((error) => {
      console.log(error);
    })
});

router.get('/checkin', (req, res) => {
  const patron_id = req.user.id;
  const queryText = 'SELECT * FROM checkins WHERE patron_person_id=$1;';
  pool.query(queryText, [patron_id])
    .then((result) => {
      console.log('checkin result.rows =', result.rows);
      res.send(result.rows[0]);
    }).catch((error) => {
      console.log(error);
    })
});

router.get('/checkins', (req, res) => {
  const queryText = 'SELECT person.username, venue.name FROM checkins INNER JOIN person ON checkins.patron_person_id=person.id INNER JOIN venue ON checkins.venue_person_id=venue.person_id;';
  pool.query(queryText)
    .then((result) => {
      console.log('checkins result.rows =', result.rows);
      res.send(result.rows);
    }).catch((error) => {
      console.log(error);
    })
});

router.post('/checkin/:id', (req,res) => {
  const venue_id = req.params.id;
  console.log('in checkin post, venue_id=', venue_id);
  const patron_id = req.user.id;
  console.log('in checkin post, patron_id=', patron_id);
  const queryText = 'INSERT INTO checkins (venue_person_id, patron_person_id) VALUES ($1, $2);';
  pool.query(queryText, [venue_id, patron_id])
    .then(() => {
      res.sendStatus(200);
    }).catch(() => {
      res.sendStatus(500);
    })
});

router.post('/friend/:id', (req,res) => {
  const patron_id = req.user.id;
  console.log('patron id = ', patron_id);
  const friend2_id = req.params.id;
  console.log('friend2_id = ', friend2_id);
  const queryText = 'INSERT INTO friendships (frienda, friendb) VALUES ($1, $2);';
  pool.query(queryText, [patron_id, friend2_id])
    .then(() => {
      res.sendStatus(200);
    }).catch(() => {
      res.sendStatus(500);
    })
});

router.delete('/checkout', (req, res) => {
  const patron_id = req.user.id;
  console.log('in delete checkin, patron_id =', patron_id);
  const queryText = 'DELETE FROM checkins WHERE patron_person_id=$1;';
  pool.query(queryText, [patron_id])
    .then(() => {
      res.sendStatus(200);
      console.log('successfully deleted check in info');
    }).catch(() => {
      res.sendStatus(500);
    })
});

module.exports = router;