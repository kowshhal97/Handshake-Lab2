const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const kafka = require('../kafka/client');

router.get('/', (req, res) => {
    req.body.path="get-all-events"
 
   kafka.make_request('events', req.body, (err, results) => {
 
    
 
     res.status(200).end(results);
 
   });
});

router.get('/:event_id', (req, res) => {
    req.body.id = request.params.event_id;
    req.body.path="get-event-by-id"
 
   kafka.make_request('events', req.body, (err, results) => {
 
    
 
     res.status(200).end(results);
 
   });
});


router.post('/:company_id', (req, res) => {
    req.body.companyId = request.params.company_id;
    req.body.path="post-event"
 
   kafka.make_request('events', req.body, (err, results) => {
 
     
 
     res.status(200).end(results);
   });
});




router.post('/registered/:student_id', (req, res) => {
    
    req.body.studentId = request.params.student_id;
    req.body.path="post-register-for-event"
 
   kafka.make_request('events', req.body, (err, results) => {
 
   
 
     res.status(200).end(results);
   });
});

module.exports = router;
