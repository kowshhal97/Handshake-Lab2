
const JobPost = require('../models/job')

updateApplicationHandler = (msg, callback) => {
    var res = {}

    // try {
    //     const post = await JobPost.findByIdAndUpdate(req.params.id, req.body)

    //     if (!post) {
    //         return res.status(404).send()
    //     }

    //     res.send(post)
    // } catch (e) {
    //     res.status(400).send(e)
    // }


    callback(err, "Hello-from-handshake!")
}


function handle_request(msg, callback) {

    console.log(msg)
    if (msg.path === "update-application") {
        updateApplicationHandler(msg, callback)
    }
};

exports.handle_request = handle_request;