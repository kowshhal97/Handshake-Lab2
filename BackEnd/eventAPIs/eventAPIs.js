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

router.get('/company/:companyName', (req, res) => {
  req.body.companyName = req.params.companyName;
  req.body.path = "get-event-by-companyName"

  kafka.make_request('events', req.body, (err, results) => {

    res.status(results.status).send(JSON.parse(results.data));

  });
});

router.post('/:companyName', (req, res) => {
  req.body.path = "post-event"

  req.body.companyName=req.params.companyName
  kafka.make_request('events', req.body, (err, results) => {


    console.log(results);

    res.status(results.status).send(JSON.parse(results.data));
  });
});




router.post('/registered/:eventId', (req, res) => {

  req.body.id = req.params.eventId;
  req.body.path = "post-register-for-event"

  console.log(req.body)
  kafka.make_request('events', req.body, (err, results) => {


    if(results.status===200)
    res.status(results.status).send(JSON.parse(results.data));
    else
    res.status(results.status).send();
  });
});

module.exports = router;
