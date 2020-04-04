


getCompanyHandler=(msg,callback)=>{
  // const _id = req.params.id

  //   try {
  //       const user = await Employer.findById(_id)

  //       if (!user) {
  //           return res.status(404).send()
  //       }

  //       res.send(user)
  //   } catch (e) {
  //       res.status(500).send()
  //   }
    callback(null,"welcome from signup!")
  
  }
  
  updateCompanyhandler=(msg,callback)=>{
  //   try {
  //     const user = await Employer.findByIdAndUpdate(req.params.id, req.body)

  //     if (!user) {
  //         return res.status(404).send()
  //     }

  //     res.send(user)
  // } catch (e) {
  //     res.status(400).send(e)
  // }
    callback(null,"welcome from signup!")
  }
  
  
  function handle_request(msg, callback) {
    var res = {};
    if(msg.path='get-company-profile'){
      getCompanyHandler(msg,callback)
    }
    if(msg.path='update-company-profile'){
      updateCompanyhandler(msg,callback)
    }
  };
  
  exports.handle_request = handle_request;