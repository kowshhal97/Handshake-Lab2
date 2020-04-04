const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const kafka=require('./../kafka/client')


router.put('/:studentId/:jobId', (req, res) => {
    req.body.student_id=req.params.studentId;
    req.body.job_id=req.params.jobId;
    req.body.path="update-application"
   kafka.make_request('applications', req.body, (err, results) => {
 
 
     res.status(200).end(results);
 
   });
});


module.exports = router;