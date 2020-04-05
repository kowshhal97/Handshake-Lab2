const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const kafka = require('../kafka/client');

router.post('/', async (req, res) => {

  req.body.path="student-login";
 
  kafka.make_request('studentAuth', req.body, (err, results) => {

console.log(results)

    res.status(200).send(results);

  });
});

module.exports = router;