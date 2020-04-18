const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const kafka = require('../kafka/client');
const { checkAuth } = require("./../passport");


const { checkAuth } = require("./../passport");

router.get('/',checkAuth, (req, res) => {
  req.body.path = "get-all-events"

  
  kafka.make_request('events', req.body, (err, results) => {

    console.log(results)

    if(results.status===200)
    res.status(results.status).send(JSON.parse(results.data));
    else
    res.status(results.status).send();

  });
});

router.get('/:event_id',checkAuth, (req, res) => {
  req.body.id = req.params.event_id;
  req.body.path = "get-event-by-id"

  kafka.make_request('events', req.body, (err, results) => {

    if(results.status===200)
    res.status(results.status).send(JSON.parse(results.data));
    else
    res.status(results.status).send();

  });
});

router.get('/company/:companyName',checkAuth, (req, res) => {
  req.body.companyName = req.params.companyName;
  req.body.path = "get-event-by-companyName"

  kafka.make_request('events', req.body, (err, results) => {

    if(results.status===200)
    res.status(results.status).send(JSON.parse(results.data));
    else
    res.status(results.status).send();

  });
});

router.post('/:companyName',checkAuth, (req, res) => {
  req.body.path = "post-event"

  req.body.companyName=req.params.companyName
  kafka.make_request('events', req.body, (err, results) => {


    console.log(results);

    if(results.status===200)
    res.status(results.status).send(JSON.parse(results.data));
    else
    res.status(results.status).send();
  });
});




router.post('/registered/:eventId',checkAuth, (req, res) => {

  req.body.id = req.params.eventId;
  req.body.path = "post-register-for-event"

  kafka.make_request('events', req.body, (err, results) => {


    if(results.status===200)
    res.status(results.status).send(JSON.parse(results.data));
    else
    res.status(results.status).send();
  });
});

module.exports = router;
