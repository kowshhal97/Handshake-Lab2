


signupHandler=(msg,callback)=>{
  callback(null,"welcome from signup!")

}

function handle_request(msg, callback) {
  var res = {};
  if(msg.path='student-signup'){

  }
  callback(null,"handhsake signup page!");
};

exports.handle_request = handle_request;