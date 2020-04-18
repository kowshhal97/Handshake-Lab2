const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const pool = require('../utils/mysqlConnection');
const kafka = require("../kafka/client");
const { auth } = require("../utils/passport");





router.post('/', async (req, res) => {

  req.body.path = "student-login";

  kafka.make_request('studentAuth', req.body, (err, results) => {

    if(results.status!=200){
      const token = jwt.sign(payload, secret, {
        expiresIn: 900000 // in seconds
      });
      let jwtToken = 'JWT ' + token;
      msg.token = jwtToken;
      return res.status(results.status).send(jwtToken);
    }

    if(results.status!=200){
      return res.status(results.status).send();
    }    res.status(results.status).send(JSON.parse(results.data));
  });
});

module.exports = router;