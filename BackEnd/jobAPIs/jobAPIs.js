const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbConnectionPool = require('../config/sqlConnectionPool');
  

router.get('/', (req, res) => {
    req.body.path="get-all-jobs"
 
   kafka.make_request('jobs', req.body, (err, results) => {
 
 
 
     res.status(200).end(results);
 
   });
});


router.get('/jobs/:job_id', (req, res) => {
    req.body.job_id = request.params.job_id;
    req.body.path="get-job-by-jobId"
 
   kafka.make_request('jobs', req.body, (err, results) => {
 
 
     res.status(200).end(results);
 
   });
});


router.post('/:company_id', (req, res) => {
    req.body.company_id = request.params.company_id;
    req.body.path="post-job"
 
   kafka.make_request('jobs', req.body, (err, results) => {
 
     // let payload = results.message;
     // var token = jwt.sign(results, "test", {
     //   expiresIn: 1008000
     // })
     // res.json({ success: true, token: 'JWT ' + token });
 
 
     res.status(200).end(results);
 
   });
});



  

module.exports = router;