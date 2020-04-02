const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const kafka = require('../kafka/client');

router.post('/', async (req, res) => {

   req.body.path="student-login"
 
  kafka.make_request('studentAuth', req.body, (err, results) => {

    // let payload = results.message;
    // var token = jwt.sign(results, "test", {
    //   expiresIn: 1008000
    // })
    // res.json({ success: true, token: 'JWT ' + token });


    res.status(200).end(results);

  });

  // try {
  //     dbConnectionPool.query(
  //     `SELECT student_password, student_id FROM student_information WHERE student_email_id='${student_email_id}'`,
  //     async (error, result) => {

  //       if (error) {
  //         console.log(error);
  //         return response.status(500).send('Server Error');
  //       }

  //       if (result.length == 0) {
  //         return response.status(401).json({errorMsg:[{msg:'Invalid Credentials'}]});
  //       }

  //       const isMatch = await bcrypt.compare(student_password, result[0].student_password);

  //       if (!isMatch) {
  //         return response.status(401).json({errorMsg:[{msg:'Invalid Credentials'}]});
  //       }

  //       const payload = {
  //         user: {
  //           id: student_email_id,
  //           usertype: 'student'
  //         }
  //       };

  //       jwt.sign(
  //         payload,
  //         "jwtSecret",
  //         {
  //           expiresIn: 600000
  //         },
  //         (error, token) => {
  //           if (error) {
  //             throw error;
  //           }
  //           response.json({token, id: result[0].student_id });
  //         }
  //       );
  //     }
  //   );
  // } catch (error) {
  //   console.error(error.message);
  //   response.status(500).send('Server Error');
  // }
});

module.exports = router;