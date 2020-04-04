
const Employer = require('../models/employer')

loginHandler=(msg,callback)=>{
  callback(null,"welcome from signup!")

}

signupHandler=(msg,callback)=>{
  // const user = new Employer(req.body)

  //   try {
  //       await user.save()
  //       res.status(201).send(user)
  //   } catch (e) {
  //       res.status(400).send(e)
  //   }
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