const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const kafka = require('../kafka/client');

router.post('/', async (req, res) => {

    
   req.body.path="company-signup"
 
   kafka.make_request('companyAuth', req.body, (err, results) => {
 
     console.log(results)
 
     if(results.status!=200){
      return res.status(results.status).send();
    }    res.status(results.status).send(JSON.parse(results.data));
 
   });
  });
  
  module.exports = router;