const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const kafka=require('./../kafka/client')


aws.config.update({
  secretAccessKey: 'VwtrGXg9aWjso48/cc+JExDhFL71X4Gs6nePB3S3',
  accessKeyId: 'AKIAITEHYHEDXFIG4KVQ',
  region: 'us-west-2'
});

const s3 = new aws.S3();


const upload = multer({
  storage: multerS3({
      s3: s3,
      acl: 'public-read',
      bucket: 'handshake-project',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      contentDisposition: 'inline',
      key: function (req, file, cb) {
          cb(null, 'profile_' + req.params.id);
      }
  })
});

const upload2 = multer({
  storage: multerS3({
      s3: s3,
      acl: 'public-read',
      bucket: 'handshake-project',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      contentDisposition: 'inline',
      key: function (req, file, cb) {
        console.log(req.params.id);
          //console.log(file);
          cb(null, 'resume_' + req.params.id);
      }
  })
});




router.get('/', (req, res) => {
  req.body.path="get-all-students"
 
  kafka.make_request('studentProfile', req.body, (err, results) => {

    console.log(results)
    
    if(results.status!=200){
      return res.status(results.status).send();
    }    res.status(results.status).send(JSON.parse(results.data));
  });
});

router.get('/:student_id', (req, res) => {
  req.body.id = req.params.student_id;
  req.body.path="get-student-by-id"
 
  kafka.make_request('studentProfile', req.body, (err, results) => {

    console.log(results);
    if(results.status!=200){
      return res.status(results.status).send();
    }    res.status(results.status).send(JSON.parse(results.data));
  });
});

router.put('/:student_id', (req, res) => {
  
  req.body.id = req.params.student_id;
  req.body.path="update-student-by-id"
 
  kafka.make_request('studentProfile', req.body, (err, results) => {


    console.log(results)
    if(results.status!=200){
      return res.status(results.status).send();
    }    res.status(results.status).send(JSON.parse(results.data));
  });
});


router.post('/upload/:id', upload.array('upl',1), (req, res, next) => {
  const id = req.params.id;
  const profile_path = 'https://handshake-project.s3-us-west-2.amazonaws.com/profile_' + id;
  res.status(200).json({msg: 'uploaded!'})
});

router.post('/upload/resume/:id', upload2.array('upl',1), (req, res, next) => {

  res.status(200).json({msg: 'uploaded'});
  
});


module.exports = router;
