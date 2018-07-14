const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const id = req.user.id
    const queryText = 'SELECT * FROM venue';
    pool.query(queryText)
      .then((result) => {
        res.send(result.rows);
        console.log('result:', result);
      })
});

// router.post('/', (req, res) => {

// });

module.exports = router;