const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const kafka = require('../kafka/client');

router.post('/', async (req, res) => {

    
   req.body.path="company-signup"
 
   kafka.make_request('companyAuth', req.body, (err, results) => {
 
     
 
     res.status(200).end(results);
 
   });
  });
  
  module.exports = router;