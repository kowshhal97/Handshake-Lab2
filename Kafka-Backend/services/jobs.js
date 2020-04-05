
const JobPost = require('../models/job')

getAllJobs = async(msg, callback) => {
    var res = {}

try {
        const posts = await JobPost.find({})
        res.status=200
        res.data=JSON.stringify(posts)
        callback(null,res)
    } catch (e) {
        res.status=500
        callback(null,res)
    }


}


getJobByIdHandler = async(msg, callback) => {
    var res = {}
    const _id = msg.id

    try {
        const post = await JobPost.findById(_id)

        if (!post) {
            res.status=404
           
            return res.status(404).send()
        }
        res.status=200
        res.data=JSON.stringify(post)
        res.send(post)
    } catch (e) {
        res.status(500).send()
    }


}



PostJobHandler = async(msg, callback) => {
    var res = {}
    const post = new JobPost(req.body)

    try {
        await post.save()
        res.status=201
        res.data=JSON.stringify(post)
        callback(null,res)
    } catch (e) {
        res.status=400
        callback(null,"err")
    }
}


function handle_request(msg, callback) {
    console.log(msg)
    if (msg.path === "get-all-jobs") {
        delete msg.path
        getAllEvents(msg, callback)
    }
    else if (msg.path === "get-job-by-jobId") {
        delete msg.path
        getEventByIdHandler(msg, callback)
    }
    else if (msg.path === "post-job") {
        delete msg.path
        postEventHandler(msg, callback)
    }
};

exports.handle_request = handle_request;