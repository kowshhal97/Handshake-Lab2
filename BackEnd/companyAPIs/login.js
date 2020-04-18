const express = require("express");
const router = express.Router();
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const kafka = require("../kafka/client");
const { checkAuth } = require("./../passport");


router.post('/', async (req, res) => {

    
   req.body.path="company-login"
 
   kafka.make_request('companyAuth', req.body, (err, results) => {
 
    if(results.status!=200){
      return res.status(results.status).send();
    }

    if(results.status!=200){
      return res.status(results.status).send();
    }    
    
    const token = jwt.sign(payload, secret, {
      expiresIn: 900000 // in seconds
    });
    let jwtToken = 'JWT ' + token;
    msg.token = jwtToken;
    return res.status(results.status).send(jwtToken);
   });
  });
  
  module.exports = router;