const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const kafka=require('./../kafka/client')


router.put('/:studentId/:jobId', (req, res) => {
    req.body.studentId=req.params.studentId;
    req.body.jobId=req.params.jobId;
    req.body.path="update-application"
   kafka.make_request('applications', req.body, (err, results) => {
 
 
     res.status(200).end(results);
 
   });
});


module.exports = router;