

updateApplicationHandler = (msg, callback) => {
    var res = {}
    callback(err, "Hello-from-handshake!")
}


function handle_request(msg, callback) {

    console.log(msg)
    if (msg.path === "update-application") {
        updateApplicationHandler(msg, callback)
    }
};

exports.handle_request = handle_request;