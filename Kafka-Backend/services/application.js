
const JobPost = require('../models/job')

updateApplicationHandler = async(msg, callback) => {
    var res = {}

    try {
        const post = await JobPost.findByIdAndUpdate(msg.id, req.body)

        if (!post) {
            res.status=400
            callback(null,res)
        }

        res.status = 200
        res.data = JSON.stringify(post)
        callback(null, res)
    } catch (e) {
        res.status=400
        callback(null,res)
    }
}


function handle_request(msg, callback) {

    console.log(msg)
    if (msg.path === "update-application") {
        delete msg.path
        updateApplicationHandler(msg, callback)
    }
};

exports.handle_request = handle_request;