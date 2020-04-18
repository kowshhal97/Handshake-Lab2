const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const kafka = require('../kafka/client');

router.post('/', async (req, res) => {

  req.body.path = "student-login";

  kafka.make_request('studentAuth', req.body, (err, results) => {

    if(results.status!=200){
      return res.status(results.status).send();
    }

    if(results.status!=200){
      return res.status(results.status).send();
    }    res.status(results.status).send(JSON.parse(results.data));
  });
});

module.exports = router;