const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/', async (req, res) => {
  req.body.path="student-signup"
 
  kafka.make_request('studentAuth', req.body, (err, results) => {

    // let payload = results.message;
    // var token = jwt.sign(results, "test", {
    //   expiresIn: 1008000
    // })
    // res.json({ success: true, token: 'JWT ' + token });


    res.status(200).end(results);
  });

})
  
  module.exports = router;