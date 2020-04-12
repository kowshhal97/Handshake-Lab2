
const EventPost = require('../models/event')
const Student=require('../models/student')

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
        console.log(res)
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
            const post = await EventPost.findById(msg.id)
            if (!post) {
                res.status = 404
                callback(null, res)
            }
            post.students.push(student)
            await post.save()
            const user = await Student.findById(student._id)
            const { companyName, event_name, event_description, event_location, event_eligibility_criteria, event_from_date, event_to_date,event_major,event_timing } = post
            const registeredEventId = post.students[post.students.length - 1]._id;
            const eventId = post._id;
            console.log(registeredEventId);
            user.registeredEvents.push({ eventId, registeredEventId, companyName, event_name, event_description, event_location, event_eligibility_criteria, event_from_date, event_to_date,event_major,event_timing })
            await user.save()
            res.status = 200
            res.data = JSON.stringify(user)
            callback(null, res)
        } else {
            const post = await EventPost.findByIdAndUpdate(msg.id, msg)

            if (!post) {
                return res.status(404).send()
            }
            res.status = 200
            res.data = JSON.stringify(post)
            callback(null, res)
        }
    } catch (e) {
        console.log(e)
        res.status = 400
        callback(null, res)
    }

}


getEventByCompanyIdHandler = async (msg, callback) => {
    res = {}
    const { companyName } = msg;
    try {
        const companyEvents = await EventPost.find({ companyName: companyName });
        res.status = 200
        res.data = JSON.stringify(companyEvents)
        console.log(res)
        callback(null, res)
    } catch (e) {
        res.status = 500
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
    else if (msg.path === 'get-event-by-companyName') {
        delete msg.path
        getEventByCompanyIdHandler(msg, callback)
    }

};

exports.handle_request = handle_request;