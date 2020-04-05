const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const kafka = require('../kafka/client');

router.get('/', (req, res) => {
    req.body.path="get-all-jobs"
 
   kafka.make_request('jobs', req.body, (err, results) => {
 
 
 
     res.status(results.status).send(JSON.parse(results.data));
 
   });
});


router.get('/:job_id', (req, res) => {
    req.body.id = req.params.job_id;
    req.body.path="get-job-by-jobId"
 
   kafka.make_request('jobs', req.body, (err, results) => {
 
 
     res.status(results.status).send(JSON.parse(results.data));
 
   });
});


router.post('/', (req, res) => {
    req.body.path="post-job";
 
   kafka.make_request('jobs', req.body, (err, results) => {
 
 
 
     res.status(results.status).send(JSON.parse(results.data));
 
   });
});



  

module.exports = router;