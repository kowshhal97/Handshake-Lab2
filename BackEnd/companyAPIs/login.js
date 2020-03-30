const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const kafka = require('../kafka/client');

router.post('/', async (req, res) => {

    
   req.body.path="company-login"
 
   kafka.make_request('login', req.body, (err, results) => {
 
     // let payload = results.message;
     // var token = jwt.sign(results, "test", {
     //   expiresIn: 1008000
     // })
     // res.json({ success: true, token: 'JWT ' + token });
 
 
     res.status(200).end(results);
 
   });
  });
  
  module.exports = router;