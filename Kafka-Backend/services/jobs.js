

getAllJobs = (msg, callback) => {
    var res = {}
    callback(err, "Hello-from-handshake!")
}


getJobByIdHandler = (msg, callback) => {
    var res = {}
    callback(err, "Hello-from-handshake!")
}



PostJobHandler = (msg, callback) => {
    var res = {}
    callback(err, "Hello-from-handshake!")
}


function handle_request(msg, callback) {

    console.log(msg)
    if (msg.path === "get-all-jobs") {
        getAllEvents(msg, callback)
    }
    else if (msg.path === "get-job-by-jobId") {
        getEventByIdHandler(msg, callback)
    }
    else if (msg.path === "post-job") {
        postEventHandler(msg, callback)
    }
};

exports.handle_request = handle_request;