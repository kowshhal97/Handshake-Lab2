const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const kafka=require('./../kafka/client')
const { checkAuth } = require("./../passport");


router.put('/:applicationId',checkAuth, (req, res) => {
    req.body.applicationId=req.params.applicationId;
    req.body.path="update-application"
   kafka.make_request('applications', req.body, (err, results) => {
 
 
    console.log(results)
    if(results.status!=200){
      return res.status(results.status).send();
    }    res.status(results.status).send(JSON.parse(results.data));
 
   });
});


router.put('/apply/:jobId', checkAuth,(req, res) => {
  req.body.id=req.params.jobId;
  req.body.path="apply"
  console.log(req.body)
 kafka.make_request('applications', req.body, (err, results) => {

  console.log(results)

    if(results.status!=200){
      return res.status(results.status).send();
    }    res.status(results.status).send(JSON.parse(results.data));

 });
});

module.exports = router;