


getCompanyHandler=(msg,callback)=>{
    callback(null,"welcome from signup!")
  
  }
  
  updateCompanyhandler=(msg,callback)=>{
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