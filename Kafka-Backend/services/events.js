
const EventPost = require('../models/event')

getAllEvents = async (msg, callback) => {
    var res = {}
    try {
        const posts = await EventPost.find({})
        res.status = 200
        res.data = JSON.stringify(posts)
        callback(null, res)
    } catch (e) {
        res.status = 500
        callback(null, res)
    }
}


getEventByIdHandler = async (msg, callback) => {
    var res = {}

    const _id = msg.id

    try {
        const post = await EventPost.findById(_id)

        if (!post) {
            res.status = 404
            callback(null, res)
        }

        res.status = 200
        res.data = JSON.stringify(post)
        callback(null, res)
    } catch (e) {
        res.status = 500
        callback(null, res)
    }
}


postEventHandler = async (msg, callback) => {
    var res = {}
    const post = new EventPost(msg)

    try {
        await post.save()
        res.status = 201
        res.data = JSON.stringify(post)
        callback(null, res)
    } catch (e) {
        res.status = 400
        callback(null, res)
    }
}


postRegisterForEvent = async (msg, callback) => {
    var res = {}
    const student = msg.student
    try {
        if (student) {
            const post = await EventPost.findById(req.params.id)
            if (!post) {
                res.status = 404
                callback(null, res)
            }
            post.students.push(student)
            await post.save()
            const user = await Student.findById(student.studentId)
            const { companyName, eventName, eventDescription, eventLocation } = post
            user.registeredEvents.push({ companyName, eventName, eventDescription, eventLocation })
            await user.save()
            res.status = 200
            res.data = JSON.stringify(user)
            callback(null, res)
        } else {
            const post = await EventPost.findByIdAndUpdate(req.params.id, req.body)

            if (!post) {
                return res.status(404).send()
            }
            res.status = 200
            res.data = JSON.stringify(post)
            callback(null, res)
        }
    } catch (e) {
        res.status = 400
        callback(null, res)
    }

}


function handle_request(msg, callback) {

    console.log(msg)
    if (msg.path === "get-all-events") {
        delete msg.path
        getAllEvents(msg, callback)
    }
    else if (msg.path === "get-event-by-id") {
        delete msg.path
        getEventByIdHandler(msg, callback)
    }
    else if (msg.path === "post-event") {
        delete msg.path
        postEventHandler(msg, callback)
    }
    else if (msg.path === 'post-register-for-event') {
        delete msg.path
        postRegisterForEvent(msg, callback)
    }
};

exports.handle_request = handle_request;