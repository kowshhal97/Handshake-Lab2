

getAllStudents=(msg,callback)=>{
    var res={}
  callback(err,"Hello-from-handshake!")
  }
  
  updateStudentByIdHandler=(msg,callback)=>{
    var res={}
  callback(err,"Hello-from-handshake!")
  }
  
  getStudentByIdHandler=(msg,callback)=>{
    var res={}
  callback(err,"Hello-from-handshake!")
  }

  
  function handle_request(msg, callback) {
  
    console.log(msg)
    if(msg.path==="get-all-students"){
        getAllStudents(msg,callback)
    }
    if(msg.path==="get-student-by-id"){
        getStudentByIdHandler(msg,callback)
    }
    if(msg.path==="update-student-by-id"){
        updateStudentByIdHandler(msg,callback)
      }
  };
  
  exports.handle_request = handle_request;