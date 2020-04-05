const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const kafka = require('../kafka/client');

router.get('/', (req, res) => {
  req.body.path = "get-all-events"

  
  kafka.make_request('events', req.body, (err, results) => {

    console.log(results)

    res.status(results.status).send(JSON.parse(results.data));

  });
});

router.get('/:event_id', (req, res) => {
  req.body.id = req.params.event_id;
  req.body.path = "get-event-by-id"

  kafka.make_request('events', req.body, (err, results) => {

    res.status(results.status).send(JSON.parse(results.data));

  });
});

router.post('/', (req, res) => {
  req.body.path = "post-event"

  kafka.make_request('events', req.body, (err, results) => {


    
    res.status(results.status).send(JSON.parse(results.data));
  });
});




router.post('/registered/:student_id', (req, res) => {

  req.body.id = req.params.student_id;
  req.body.path = "post-register-for-event"

  kafka.make_request('events', req.body, (err, results) => {



    res.status(results.status).send(JSON.parse(results.data));
  });
});

module.exports = router;
