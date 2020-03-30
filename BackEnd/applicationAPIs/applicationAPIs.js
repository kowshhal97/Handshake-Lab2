const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const kafka=require('./../kafka/client')

router.get('/:company_id', (req, res) => {
    req.body.company_id=req.params.company_id;
    req.body.path="get-company-application"
 
   kafka.make_request('applications', req.body, (err, results) => {
 
     // let payload = results.message;
     // var token = jwt.sign(results, "test", {
     //   expiresIn: 1008000
     // })
     // res.json({ success: true, token: 'JWT ' + token });
 
 
     res.status(200).end(results);
 
   });
});

router.get('/job/:job_id', (req, res) => {
    req.body.company_id=req.params.company_id;
    req.body.path="get-application-by-jobId"
 
   kafka.make_request('applications', req.body, (err, results) => {
 
     // let payload = results.message;
     // var token = jwt.sign(results, "test", {
     //   expiresIn: 1008000
     // })
     // res.json({ success: true, token: 'JWT ' + token });
 
 
     res.status(200).end(results);
 
   });
});

router.get('/:student_id', (req, res) => {
    req.body.company_id=req.params.company_id;
    req.body.path="get-application-by-jobId"
 
   kafka.make_request('applications', req.body, (err, results) => {
 
     // let payload = results.message;
     // var token = jwt.sign(results, "test", {
     //   expiresIn: 1008000
     // })
     // res.json({ success: true, token: 'JWT ' + token });
 
 
     res.status(200).end(results);
 
   });
});


router.get('/getJob/:studentId/:jobId', (req, res) => {
    const student_id = request.params.studentId;
    const job_id=request.params.jobId
    req.body.student_id=req.params.studentId;
    req.body.job_id=req.params.jobId;
    req.body.path="get-application-by-jobId-studentId"
 
   kafka.make_request('applications', req.body, (err, results) => {
 
     // let payload = results.message;
     // var token = jwt.sign(results, "test", {
     //   expiresIn: 1008000
     // })
     // res.json({ success: true, token: 'JWT ' + token });
 
 
     res.status(200).end(results);
 
   });
});


router.post('/', (req, res) => {
    req.body.path="post-application"
 
   kafka.make_request('applications', req.body, (err, results) => {
 
     // let payload = results.message;
     // var token = jwt.sign(results, "test", {
     //   expiresIn: 1008000
     // })
     // res.json({ success: true, token: 'JWT ' + token });
 
 
     res.status(200).end(results);
 
   });
});

router.post('/:company_id', (req, res) => {
    req.body.path="post-application-status"
 
   kafka.make_request('applications', req.body, (err, results) => {
 
     // let payload = results.message;
     // var token = jwt.sign(results, "test", {
     //   expiresIn: 1008000
     // })
     // res.json({ success: true, token: 'JWT ' + token });
 
 
     res.status(200).end(results);
 
   });
});

module.exports = router;