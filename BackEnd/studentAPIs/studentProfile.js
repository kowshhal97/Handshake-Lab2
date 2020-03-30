const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbConnectionPool = require('../config/sqlConnectionPool');

// aws.config.update({
//   secretAccessKey: 'VwtrGXg9aWjso48/cc+JExDhFL71X4Gs6nePB3S3',
//   accessKeyId: 'AKIAITEHYHEDXFIG4KVQ',
//   region: 'us-west-2'
// });

// const s3 = new aws.S3();


// const upload = multer({
//   storage: multerS3({
//       s3: s3,
//       acl: 'public-read',
//       bucket: 'handshake-project',
//       contentType: multerS3.AUTO_CONTENT_TYPE,
//       contentDisposition: 'inline',
//       key: function (req, file, cb) {
//           cb(null, 'profile_' + req.params.id);
//       }
//   })
// });

// const upload2 = multer({
//   storage: multerS3({
//       s3: s3,
//       acl: 'public-read',
//       bucket: 'handshake-project',
//       contentType: multerS3.AUTO_CONTENT_TYPE,
//       contentDisposition: 'inline',
//       key: function (req, file, cb) {
//         console.log(req.params.id);
//           //console.log(file);
//           cb(null, 'resume_' + req.params.id);
//       }
//   })
// });

router.get('/', (req, res) => {
  req.body.path="get-all-students"
 
  kafka.make_request('profile', req.body, (err, results) => {

    // let payload = results.message;
    // var token = jwt.sign(results, "test", {
    //   expiresIn: 1008000
    // })
    // res.json({ success: true, token: 'JWT ' + token });


    res.status(200).end(results);
  });
});

router.get('/:student_id', (request, response) => {
  req.body.student_id = request.params.student_id;
  req.body.path="get-student-by-id"
 
  kafka.make_request('profile', req.body, (err, results) => {

    // let payload = results.message;
    // var token = jwt.sign(results, "test", {
    //   expiresIn: 1008000
    // })
    // res.json({ success: true, token: 'JWT ' + token });


    res.status(200).end(results);
  });
});

router.post('/basicDetails/:student_id', (request, response) => {
  
  req.body.student_id = request.params.student_id;
  req.body.path="post-student-by-id"
 
  kafka.make_request('profile', req.body, (err, results) => {

    // let payload = results.message;
    // var token = jwt.sign(results, "test", {
    //   expiresIn: 1008000
    // })
    // res.json({ success: true, token: 'JWT ' + token });


    res.status(200).end(results);
  });
});

router.get('/educationDetails/:student_id', (request, response) => {
  req.body.student_id = request.params.student_id;
  req.body.path="get-student-education-by-id"
 
  kafka.make_request('profile', req.body, (err, results) => {

    // let payload = results.message;
    // var token = jwt.sign(results, "test", {
    //   expiresIn: 1008000
    // })
    // res.json({ success: true, token: 'JWT ' + token });


    res.status(200).end(results);
  });
});

router.post('/educationDetails/:student_id', (request, response) => {
  req.body.student_id = request.params.student_id;
  req.body.path="get-education-of-student-by-id"
 
  kafka.make_request('profile', req.body, (err, results) => {

    // let payload = results.message;
    // var token = jwt.sign(results, "test", {
    //   expiresIn: 1008000
    // })
    // res.json({ success: true, token: 'JWT ' + token });


    res.status(200).end(results);
  });
});

router.put('/educationDetails/:education_id', (request, response) => {
  req.body.education_id = request.params.education_id;
  req.body.path="update-student-education-by-id"
 
  kafka.make_request('profile', req.body, (err, results) => {

    // let payload = results.message;
    // var token = jwt.sign(results, "test", {
    //   expiresIn: 1008000
    // })
    // res.json({ success: true, token: 'JWT ' + token });


    res.status(200).end(results);
  });
});

router.get('/experienceDetails/:student_id', (req, res) => {
  req.body.student_id = request.params.student_id;
  req.body.path="get-experience-of-student-by-id"
 
  kafka.make_request('profile', req.body, (err, results) => {

    // let payload = results.message;
    // var token = jwt.sign(results, "test", {
    //   expiresIn: 1008000
    // })
    // res.json({ success: true, token: 'JWT ' + token });


    res.status(200).end(results);
  });
});

router.post('/experienceDetails/:student_id', (request, response) => {
  const student_id = request.params.student_id;
  const { company_name, designation, starting_date, ending_date, company_location, work_summary } = request.body;

  try {
    var query = `INSERT into student_experience_details (company_name, designation, 
      starting_date, ending_date, work_summary, company_location, student_id) 
      VALUES ('${company_name}', '${designation}', '${work_summary}', '${company_location}', 
      '${starting_date}', '${ending_date}', ${student_id})`;

    dbConnectionPool.query(query, (error, result) => {
      if (error) {
        console.log(error);
        return response.status(500).send('Server Error');
      }
      console.log(result);

      response.status(200).json({ result });
    });
  } catch (error) {
    console.log(error);
    response.status(500).send('Server Error');
  }
});

router.put('/experienceDetails/:student_id', (request, response) => {
  const student_id = request.params.student_id;
  const { company_name, designation, starting_date, ending_date, company_location, work_summary, experience_id } = request.body;

  try {
    var query = `UPDATE student_experience_details set company_name = '${company_name}', designation = '${designation}', work_summary = '${work_summary}', company_location ='${company_location}', starting_date = '${starting_date}', ending_date = '${ending_date}' WHERE (student_id = ${student_id} AND experience_id = ${experience_id})`;
    dbConnectionPool.query(query, (error, result) => {
      if (error) {
        console.log(error);
        return response.status(500).send('Server Error');
      }
      console.log(result);

      response.status(200).json({ result });
    });
  } catch (error) {
    console.log(error);
    response.status(500).send('Server Error');
  }
});

router.post('/skills/:student_id', (request, response) => {
  const student_id = request.params.student_id;
  const { skillSet } = request.body;

  try {
    var query = `UPDATE student_information set skillSet = '${skillSet}' WHERE student_id = ${student_id}`;
    dbConnectionPool.query(query, (error, result) => {
      if (error) {
        console.log(error);
        return response.status(500).send('Server Error');
      }
      console.log(result);

      response.status(200).json({ result });
    });
  } catch (error) {
    console.log(error);
    response.status(500).send('Server Error');
  }
});

// router.post('/upload/resume/:id', upload2.array('upl',1), (req, res, next) => {

//   res.status(200).json({msg: 'uploaded'});
  
// });

// router.post('/upload/:id', upload.array('upl',1), (req, res, next) => {
//   console.log("bhbjhbjhbjhbjhjbhjb")
//   const id = req.params.id;
//   const profile_path = 'https://handshake-project.s3-us-west-2.amazonaws.com/profile_' + id;
//   try {
//     dbConnectionPool.query(`UPDATE student_information set student_profile_photo = '${profile_path}'   WHERE student_id=${id}`, (err, result) => {
//       if(err) {
//         console.log(err);
//         res.status(500).send('server error');
//       }
//       res.status(200).json({msg: 'uploaded!'})
//     })
    
//   } catch (err) {
//     console.log(err);
//     res.status(500).send('server error!');
//   }
// });


module.exports = router;
