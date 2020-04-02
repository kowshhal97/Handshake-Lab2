

getAllEvents = (msg, callback) => {
    var res = {}
    callback(err, "Hello-from-handshake!")
}


getEventByIdHandler = (msg, callback) => {
    var res = {}
    callback(err, "Hello-from-handshake!")
}



postEventHandler = (msg, callback) => {
    var res = {}
    callback(err, "Hello-from-handshake!")
}


postRegisterForEvent = (msg, callback) => {
    var res = {}
    callback(err, "Hello-from-handshake!")
}






function handle_request(msg, callback) {

    console.log(msg)
    if (msg.path === "get-all-events") {
        getAllEvents(msg, callback)
    }
    else if (msg.path === "get-event-by-id") {
        getEventByIdHandler(msg, callback)
    }
    else if (msg.path === "post-event") {
        postEventHandler(msg, callback)
    }
    else if (msg.path === 'post-register-for-event') {
        postRegisterForEvent(msg, callback)
    }
};

exports.handle_request = handle_request;