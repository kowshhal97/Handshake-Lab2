

loginHandler=(msg,callback)=>{
  var res={}
callback(err,"Hello-from-handshake!")
}

signupHandler=(msg,callback)=>{
  var res={}
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