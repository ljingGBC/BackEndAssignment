const mongoose = require('mongoose');

// set up Message schema for Message collection of MongoDB
const MessageSchema = new mongoose.Schema({
    username: String,
    messageText: String, 
    createdAt: Date   
});

const Message = mongoose.model("Message", MessageSchema, "Message");
module.exports = Message;
