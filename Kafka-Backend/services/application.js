
const JobPost = require('../models/job')

const Student=require('./../models/student')
updateApplicationHandler = async (msg, callback) => {
    // var res = {}

    // _id = msg.id
    // try {
    //     const post = await JobPost.findByIdAndUpdate(_id,msg)

    //     if (!post) {
    //         res.status = 400
    //         callback(null, res)
    //     }

    //     res.status = 200
    //     res.data = JSON.stringify(post)
    //     callback(null, res)
    // } catch (e) {
    //     res.status = 400
    //     callback(null, res)
    // }
}

applyHandler = async(msg, callback) => {
    var res = {}
    const student = msg.student
    try {
        if (student) {
            const post = await JobPost.findById(msg.id)
            if (!post) {
                res.status = 404
                callback(null, res)
            }
            post.students.push(student)
            await post.save()
            const user = await Student.findById(student.studentId)
            console.log(user)
            const { companyName, title, postingDate, deadline, location, salary, jobDescription, category } = post
            user.applications.push({ companyName, title, location, salary, jobDescription, category });
            console.log(user);
            await user.save()
            res.status = 200
            res.data = JSON.stringify(user)
            callback(null, res)
        } else {
            const post = await JobPost.findByIdAndUpdate(req.params.id, req.body)

            if (!post) {
                res.status = 404
                callback(null, res)
            }
            res.status = 200
            res.data = JSON.stringify(post)
            callback(null, res)
        }
    } catch (e) {
        console.log(e)
        res.status=400
        callback(null,res)
    }

}

function handle_request(msg, callback) {

    console.log(msg)
    if (msg.path === 'apply') {
        delete msg.path
        applyHandler(msg, callback)

    }
    if (msg.path === "update-application") {
        delete msg.path
        updateApplicationHandler(msg, callback)
    }
};

exports.handle_request = handle_request;