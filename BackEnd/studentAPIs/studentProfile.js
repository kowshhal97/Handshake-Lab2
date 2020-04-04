const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  req.body.path="get-all-students"
 
  kafka.make_request('profile', req.body, (err, results) => {



    res.status(200).end(results);
  });
});

router.get('/:student_id', (request, response) => {
  req.body.student_id = request.params.student_id;
  req.body.path="get-student-by-id"
 
  kafka.make_request('profile', req.body, (err, results) => {




    res.status(200).end(results);
  });
});

router.put('/basicDetails/:student_id', (request, response) => {
  
  req.body.student_id = request.params.student_id;
  req.body.path="update-student-by-id"
 
  kafka.make_request('profile', req.body, (err, results) => {




    res.status(200).end(results);
  });
});






module.exports = router;
