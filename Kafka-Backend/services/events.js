
const EventPost = require('../models/event')

getAllEvents = (msg, callback) => {
    var res = {}
     // try {
    //     const posts = await EventPost.find({})
    //     res.send(posts)
    // } catch (e) {
    //     res.status(500).send()
    // }
    callback(err, "Hello-from-handshake!")
}


getEventByIdHandler = (msg, callback) => {
    var res = {}
   

    // const _id = req.params.id

    // try {
    //     const post = await EventPost.findById(_id)

    //     if (!post) {
    //         return res.status(404).send()
    //     }

    //     res.send(post)
    // } catch (e) {
    //     res.status(500).send()
    // }
    callback(err, "Hello-from-handshake!")
}



postEventHandler = (msg, callback) => {
    var res = {}
    // const post = new EventPost(req.body)

    // try {
    //     await post.save()
    //     res.status(201).send(post)
    // } catch (e) {
    //     res.status(400).send(e)
    // }
    callback(err, "Hello-from-handshake!")
}


postRegisterForEvent = (msg, callback) => {
    var res = {}
    // try {
    //     const post = await EventPost.findByIdAndUpdate(req.params.id, req.body)

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