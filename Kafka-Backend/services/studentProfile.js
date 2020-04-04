

getAllStudents=(msg,callback)=>{
    var res={}
  //   try {
  //     const users = await Student.find({})
  //     res.send(users)
  // } catch (e) {
  //     res.status(500).send()
  // }
  callback(err,"Hello-from-handshake!")
  }
  
  updateStudentByIdHandler=(msg,callback)=>{
    var res={}
  //   try {
  //     const user = await Student.findByIdAndUpdate(req.params.id, req.body)

  //     if (!user) {
  //         return res.status(404).send()
  //     }

  //     res.send(user)
  // } catch (e) {
  //     res.status(400).send(e)
  // }
  callback(err,"Hello-from-handshake!")
  }
  
  getStudentByIdHandler=(msg,callback)=>{
    var res={}
    // const _id = req.params.id

    // try {
    //     const user = await Student.findById(_id)

    //     if (!user) {
    //         return res.status(404).send()
    //     }

    //     res.send(user)
    // } catch (e) {
    //     res.status(500).send()
    // }
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