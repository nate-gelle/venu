const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const id = req.user.id
    const queryText = 'SELECT * FROM venue WHERE person_id=$1';
    pool.query(queryText, [id])
      .then((result) => {
        res.send(result.rows[0]);
        console.log('result:', result);
      })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

router.put('/update', (req, res) => {
    console.log('update req:', req.body);
    console.log(req.user);
    const id = req.user.id;
    const rb = req.body;
    const category = rb.category;
    const url = rb.url;
    const address = rb.address;
    const phone = rb.phone;
    const outdoor = true;
    const price = rb.price;
    const queryText = 'UPDATE venue SET category=$1, url=$2, address=$3, phone=$4, outdoor=$5, price=$6 WHERE person_id=$7;';
    console.log('rb', rb);
    pool.query(queryText, [category, url, address, phone, outdoor, price, id])
        .then(() => {res.sendStatus(201);})
        .catch((err) => {res.sendStatus(500);})
});

module.exports = router;