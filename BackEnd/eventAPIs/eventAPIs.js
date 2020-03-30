const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const kafka = require('../kafka/client');

router.get('/', (req, res) => {
    req.body.path="get-all-events"
 
   kafka.make_request('events', req.body, (err, results) => {
 
     // let payload = results.message;
     // var token = jwt.sign(results, "test", {
     //   expiresIn: 1008000
     // })
     // res.json({ success: true, token: 'JWT ' + token });
 
 
     res.status(200).end(results);
 
   });
});

router.get('/:event_id', (req, res) => {
    req.body.event_id = request.params.event_id;
    req.body.path="get-event-by-id"
 
   kafka.make_request('events', req.body, (err, results) => {
 
     // let payload = results.message;
     // var token = jwt.sign(results, "test", {
     //   expiresIn: 1008000
     // })
     // res.json({ success: true, token: 'JWT ' + token });
 
 
     res.status(200).end(results);
 
   });
});

router.get('/events/:company_id', (req, res) => {
    req.body.company_id = request.params.company_id;
    req.body.path="get-event-by-companyid"
 
   kafka.make_request('events', req.body, (err, results) => {
 
     // let payload = results.message;
     // var token = jwt.sign(results, "test", {
     //   expiresIn: 1008000
     // })
     // res.json({ success: true, token: 'JWT ' + token });
 
 
     res.status(200).end(results);
   });
});

router.post('/:company_id', (req, res) => {
    req.body.company_id = request.params.company_id;
    req.body.path="post-event"
 
   kafka.make_request('events', req.body, (err, results) => {
 
     // let payload = results.message;
     // var token = jwt.sign(results, "test", {
     //   expiresIn: 1008000
     // })
     // res.json({ success: true, token: 'JWT ' + token });
 
 
     res.status(200).end(results);
   });
});

router.get('/registered/:event_id', (req, res) => {
    req.body.event_id = request.params.event_id;
    req.body.path="get-registerd-by-eventid"
 
   kafka.make_request('events', req.body, (err, results) => {
 
     // let payload = results.message;
     // var token = jwt.sign(results, "test", {
     //   expiresIn: 1008000
     // })
     // res.json({ success: true, token: 'JWT ' + token });
 
 
     res.status(200).end(results);
   });
});

router.get('/registered/students/:event_id', (req, res) => {
    // const event_id = request.params.event_id;
    // try {
    //     dbConnectionPool.query(`SELECT * from registered_events WHERE student_id=${event_id}`, (error, result) => {
    //         if (error) {
    //             console.log(error);
    //             return response.status(500).send('Server Error');
    //         }
    //         console.log(result);
    //         response.status(200).json({result});
    //     });
    // } catch (error) {
    //   console.log(error);
    //   response.status(500).send('Server Error');
    // }
});


router.post('/registered/:student_id', (req, res) => {
    
    req.body.student_id = request.params.student_id;
    req.body.path="post-register-for-event"
 
   kafka.make_request('events', req.body, (err, results) => {
 
     // let payload = results.message;
     // var token = jwt.sign(results, "test", {
     //   expiresIn: 1008000
     // })
     // res.json({ success: true, token: 'JWT ' + token });
 
 
     res.status(200).end(results);
   });
});

module.exports = router;
