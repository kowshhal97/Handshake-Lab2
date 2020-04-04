

loginHandler=(msg,callback)=>{
  var res={}
callback(err,"Hello-from-handshake!")
}

signupHandler=(msg,callback)=>{
  var res={}
  console.log(res)
  // const user = new Student(req.body)

  // try {
  //     await user.save()
      
  //     res.status(201).send(user)
  // } catch (e) {
  //     res.status(400).send(e)
  // }
  callback(err,"Hello-from-handshake!")
}


function handle_request(msg, callback) {

  console.log(msg)
  if(msg.path==="student-login"){
    loginHandler(msg,callback)
  }
  if(msg.path==="student-signup"){
    signupHandler(msg,callback)
  }
};

exports.handle_request = handle_request;