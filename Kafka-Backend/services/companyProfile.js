
const Employer=require('./../models/employer')

getCompanyHandler = async (msg, callback) => {
  var res={}


  try {
    const user = await Employer.findOne({name:msg.id})

    if (!user) {
      res.status = 404
      callback(null, res);
    }
    res.status = 200
    res.data = JSON.stringify(user)
    callback(null, res)
  } catch (e) {
    console.log(e)
    callback(null, "err")
  }
}

updateCompanyhandler = async (msg, callback) => {
  var res={}
  try {
    const user = await Employer.findOneAndUpdate({name:msg.name}, msg,{new:true})

    if (!user) {
      res.status = 404
      callback(null, res)

    }
    res.status = 200
    res.data = JSON.stringify(user)
    callback(null, res)
  } catch (e) {
    console.log(e)
    res.status = 400
    callback(null, res)
  }
}


function handle_request(msg, callback) {
  console.log(msg)
  if (msg.path === 'get-company-profile') {
    delete msg.path
    getCompanyHandler(msg, callback)
  }
  if (msg.path === 'Update-company-profile') {
    delete msg.path
    updateCompanyhandler(msg, callback)
  }
};

exports.handle_request = handle_request;