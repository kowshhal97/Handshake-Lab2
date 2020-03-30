const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const kafka = require('../kafka/client');
router.get('/:company_id', (req, res) => {
  req.body.path="get-company-profile"
  req.body.company_id=req.params.company_id


  kafka.make_request('profile', req.body, (err, results) => {
 
    // let payload = results.message;
    // var token = jwt.sign(results, "test", {
    //   expiresIn: 1008000
    // })
    // res.json({ success: true, token: 'JWT ' + token });


    res.status(200).end(results);

  });
});

router.put('/:company_id', (req, res) => {
  req.body.path="Update-company-profile"
  req.body.company_id=req.params.company_id


  kafka.make_request('profile', req.body, (err, results) => {
 
    // let payload = results.message;
    // var token = jwt.sign(results, "test", {
    //   expiresIn: 1008000
    // })
    // res.json({ success: true, token: 'JWT ' + token });


    res.status(200).end(results);

  });
});

module.exports = router;