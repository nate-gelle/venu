const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from database
  queryText = 'SELECT id, username, type FROM person WHERE id=$1';
  pool.query(queryText, [req.user.id])
    .then((result) => {
      res.send(result.rows[0]);
      console.log('result:', result);
    })
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  console.log('req: ', req.body);
  
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const type = req.body.type;
  const name = req.body.name;
  const first = req.body.first;
  const last = req.body.last;
  const queryTextPerson = 'INSERT INTO person (username, password, type) VALUES ($1, $2, $3) RETURNING id';
  const queryTextPatron = 'INSERT INTO patron (first, last) VALUES ($1, $2)';
  const queryTextVenue = 'INSERT INTO venue (name) VALUES ($1)';
  pool.query(queryTextPerson, [username, password, type])
    .then(() => {
      if(type === 'venue'){
        pool.query(queryTextVenue, [name])
          .then(() => {res.sendStatus(201); })
          .catch((err) => { next(err); });
      }  
      else if(type === 'patron'){
        pool.query(queryTextPatron, [first, last])
          .then(() => {res.sendStatus(201); })
          .catch((err) => { next(err); });
      };
    })
      .catch((err) => { next(err); })
});    

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.get('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
