const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const kafka = require("../kafka/client");
const { auth } = require("../utils/passport");




router.post('/', async (req, res) => {
  req.body.path = "student-signup"


  kafka.make_request('studentAuth', req.body, (err, results) => {


    console.log(results)

    if (results.status != 201) {
      return res.status(results.status).send();
    }
    if (results.status != 200) {
      return res.status(results.status).send();
    }

    const token = jwt.sign(payload, secret, {
      expiresIn: 900000 // in seconds
    });
    let jwtToken = 'JWT ' + token;
    msg.status = STATUS_CODE.SUCCESS;
    msg.token = jwtToken;
    res.status(results.status).send(JSON.parse(jwtToken));

  });

})

module.exports = router;