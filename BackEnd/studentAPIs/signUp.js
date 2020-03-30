const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbConnectionPool = require('../config/sqlConnectionPool');


router.post('/', async (request, response) => {
  req.body.path="student-signup"
 
  kafka.make_request('signup', req.body, (err, results) => {

    // let payload = results.message;
    // var token = jwt.sign(results, "test", {
    //   expiresIn: 1008000
    // })
    // res.json({ success: true, token: 'JWT ' + token });


    res.status(200).end(results);
  });

})
  
  module.exports = router;