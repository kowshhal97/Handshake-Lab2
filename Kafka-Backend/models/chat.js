const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    messages: [{
        text: {
            type: String,
            deliverAt: Date,
            sender: {type: String, required: true }
        },
        participants: {
            primary: String,
            secondary: String
        }
    }]
})

const Chat = mongoose.model('chat', ChatSchema);

module.exports = Chat;