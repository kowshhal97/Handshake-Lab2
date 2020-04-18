const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const kafka = require('../kafka/client');
const { checkAuth } = require("./../passport");




router.get('/:company_id', checkAuth,(req, res) => {
  req.body.path="get-company-profile"
  req.body.id=req.params.company_id


  kafka.make_request('companyProfile', req.body, (err, results) => {
 

    console.log(results)
     if(results.status!=200){
      return res.status(results.status).send();
    }    res.status(results.status).send(JSON.parse(results.data));

  });
});

router.put('/:company_id',checkAuth, (req, res) => {
  console.log(req.body)
  req.body.path="Update-company-profile"
  req.body.id=req.params.company_id

  kafka.make_request('companyProfile', req.body, (err, results) => {
 

    console.log(results)
    if(results.status!=200){
      return res.status(results.status).send();
    }    res.status(results.status).send(JSON.parse(results.data));

  });
});

module.exports = router;