const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const kafka=require('./../kafka/client')


router.put('/:applicationId', (req, res) => {
    req.body.applicationId=req.params.applicationId;
    req.body.path="update-application"
   kafka.make_request('applications', req.body, (err, results) => {
 
 
    console.log(results)
    res.status(results.status).send(JSON.parse(results.data));
 
   });
});


router.put('/apply/:jobId', (req, res) => {
  req.body.id=req.params.jobId;
  req.body.path="apply"
  console.log(req.body)
 kafka.make_request('applications', req.body, (err, results) => {

  console.log(results)

    res.status(results.status).send(JSON.parse(results.data));

 });
});

module.exports = router;