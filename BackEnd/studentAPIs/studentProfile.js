const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const kafka=require('./../kafka/client')

router.get('/', (req, res) => {
  req.body.path="get-all-students"
 
  kafka.make_request('studentProfile', req.body, (err, results) => {


    res.status(results.status).send(results.data);
  });
});

router.get('/:student_id', (request, response) => {
  req.body.student_id = request.params.student_id;
  req.body.path="get-student-by-id"
 
  kafka.make_request('studentProfile', req.body, (err, results) => {




    res.status(results.status).end(results.data);
  });
});

router.put('/basicDetails/:student_id', (request, response) => {
  
  req.body.student_id = request.params.student_id;
  req.body.path="update-student-by-id"
 
  kafka.make_request('studentProfile', req.body, (err, results) => {




    res.status(results.status).end(results.data);
  });
});






module.exports = router;
