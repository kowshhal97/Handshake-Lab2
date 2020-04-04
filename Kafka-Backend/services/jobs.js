
const JobPost = require('../models/job')

getAllJobs = (msg, callback) => {
    var res = {}

// try {
    //     const posts = await JobPost.find({})
    //     res.send(posts)
    // } catch (e) {
    //     res.status(500).send()
    // }


    callback(err, "Hello-from-handshake!")
}


getJobByIdHandler = (msg, callback) => {
    var res = {}
    const _id = req.params.id

    // try {
    //     const post = await JobPost.findById(_id)

    //     if (!post) {
    //         return res.status(404).send()
    //     }

    //     res.send(post)
    // } catch (e) {
    //     res.status(500).send()
    // }



    
    callback(err, "Hello-from-handshake!")
}



PostJobHandler = (msg, callback) => {
    var res = {}
    
    // const post = new JobPost(req.body)

    // try {
    //     await post.save()
    //     res.status(201).send(post)
    // } catch (e) {
    //     res.status(400).send(e)
    //}
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