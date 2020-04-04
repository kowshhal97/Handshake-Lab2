const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const kafka = require('../kafka/client');

router.post('/', async (req, res) => {

  let msg={}
  msg.body=-req.body
  msg.path="student-login";
 
  kafka.make_request('studentAuth', msg, (err, results) => {

console.log(results)

    res.status(200).send(results);

  });
});

module.exports = router;