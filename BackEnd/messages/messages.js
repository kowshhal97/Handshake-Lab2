const express=require('express')
const router=express.Router()
const kafka = require('../kafka/client');
const { checkAuth } = require("./../passport");

router.post('/', checkAuth,async (req, res) => {

    req.body.path="create-a-message"
 
   kafka.make_request('messages', req.body, (err, results) => {
 
 
    
     if(results.status!=200){
      return res.status(results.status).send();
    }    res.status(results.status).send(JSON.parse(results.data));
 
   });

})

router.get('/students/:id',checkAuth, async (req, res) => {

    req.body.id = req.params.id;
    req.body.path="get-chat-by-Student-id"
 
   kafka.make_request('messages', req.body, (err, results) => {
 
 
    console.log(results)
      if(results.status!=200){
      return res.status(results.status).send();
    }    res.status(results.status).send(JSON.parse(results.data));
 
   });
})

router.get('/:id', checkAuth,async (req, res) => {
    req.body.id = req.params.id;
    req.body.path="get-chats-by-id"
 
   kafka.make_request('messages', req.body, (err, results) => {
 
 
    console.log(results)
     if(results.status!=200){
      return res.status(results.status).send();
    }    res.status(results.status).send(JSON.parse(results.data));
 
   });
})

router.put('/:id',checkAuth, async (req, res) => {
    req.body.id = req.params.id;
    req.body.path="update-chats-by-id"
 
   kafka.make_request('messages', req.body, (err, results) => {
 
 
     if(results.status!=200){
      return res.status(results.status).send();
    }    res.status(results.status).send(JSON.parse(results.data));
 
   });
  
})


module.exports = router