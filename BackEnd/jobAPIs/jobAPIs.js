const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const kafka = require('../kafka/client');

const { checkAuth } = require("./../passport");

router.get('/', (req, res) => {
    req.body.path="get-all-jobs"
 
   kafka.make_request('jobs', req.body, (err, results) => {
 
 
 
     if(results.status!=200){
      return res.status(results.status).send();
    }    res.status(results.status).send(JSON.parse(results.data));
 
   });
});


router.get('/:job_id', (req, res) => {
  console.log("GET JOB BY ID")
    req.body.id = req.params.job_id;
    req.body.path="get-job-by-jobId";
 
   kafka.make_request('jobs', req.body, (err, results) => {
 

     if(results.status!=200){
      return res.status(results.status).send();
    }    res.status(results.status).send(JSON.parse(results.data));
   });
});


router.post('/:companyName', (req, res) => {
  req.body.companyName=req.params.companyName;
    req.body.path="post-job";
 
   kafka.make_request('jobs', req.body, (err, results) => {
 
 
 
     if(results.status!=200){
      return res.status(results.status).send();
    }    res.status(results.status).send(JSON.parse(results.data));
 
   });
});

router.get('/company/:companyName', (req, res) => {
  req.body.companyName = req.params.companyName;
  req.body.path="get-jobs-by-company-name"

 kafka.make_request('jobs', req.body, (err, results) => {


   if(results.status!=200){
      return res.status(results.status).send();
    }    res.status(results.status).send(JSON.parse(results.data));

 });
});


  

module.exports = router;