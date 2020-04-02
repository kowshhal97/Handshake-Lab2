


loginHandler=(msg,callback)=>{
  callback(null,"welcome from signup!")

}

signupHandler=(msg,callback)=>{
  callback(null,"welcome from signup!")
}


function handle_request(msg, callback) {
  var res = {};
  if(msg.path='company-login'){
    loginHandler(msg,callback)
  }
  if(msg.path='company-signup'){
    signupHandler(msg,callback)
  }
};

exports.handle_request = handle_request;