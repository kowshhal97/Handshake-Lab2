
const JobPost = require('../models/job')

const getAllJobs = async (msg, callback) => {
    var res = {}

    try {
        const posts = await JobPost.find({})
        res.status = 200
        res.data = JSON.stringify(posts)
        callback(null, res)
    } catch (e) {
        res.status = 500
        callback(null, res)
    }
}

const getJobByIdHandler = async (msg, callback) => {
    console.log(msg)
    var res = {}
    const _id = msg.id

    console.log(msg)
    try {
        const post = await JobPost.findById(_id)

        if (!post) {
            res.status = 404
            callback(null, res)
        }
        res.status = 200
        res.data = JSON.stringify(post)
        console.log(res)
        callback(null, res)
    } catch (e) {
        console.log(e)
        res.status = 200
        callback(null, "err")
    }


}



const PostJobHandler = async (msg, callback) => {
    var res = {}
    console.log(msg)
    const post = new JobPost(msg)
    try {
        await post.save()
        res.status = 200
        res.data = JSON.stringify(post)
        callback(null, res)
    } catch (e) {
        res.status = 400
        callback(null, "err")
    }
}

const getJobsbyCompanyNameHandler = async (msg, callback) => {
    var res = {}

    try {
        const posts = await JobPost.find({ companyName: msg.companyName })
        res.status = 200
        res.data = JSON.stringify(posts)
        callback(null, res)
    } catch (e) {
        res.status = 500
        callback(null, res)
    }
}


function handle_request(msg, callback) {
    if (msg.path === "get-all-jobs") {
        delete msg.path
        getAllJobs(msg, callback)
    }
    else if (msg.path === "get-job-by-jobId") {
        delete msg.path
        getJobByIdHandler(msg, callback)
    }
    else if (msg.path === "post-job") {
        delete msg.path
        PostJobHandler(msg, callback)
    }
    else if (msg.path === 'get-jobs-by-company-name') {
        delete msg.path
        getJobsbyCompanyNameHandler(msg, callback)
    }
};

exports.handle_request = handle_request;