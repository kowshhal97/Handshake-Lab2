
const Employer = require('../models/employer')

loginHandler=(msg,callback)=>{
  try {
    const user = await Employer.findOne(msg.body)

    if(!user) {
        res.status=400
        callback(null,res)
    }

    res.status=200
    res
    callback(null)
    res.send(user)
} catch (e) {
    res.status(500).send()
}

}

signupHandler=async(msg,callback)=>{
  res={}

  const user = new Employer(msg.body)

    try {
        await user.save()
        res.data=user
        res.status=201
        callback(null,res)
    } catch (e) {
      res.status=400
      callback(e,res)
    }
  
}


function handle_request(msg, callback) {
  var res = {};
  if(msg.path='company-login'){
    delete msg.path
    loginHandler(msg,callback)
  }
  if(msg.path='company-signup'){
    delete msg.path
    signupHandler(msg,callback)
  }
};

exports.handle_request = handle_request;