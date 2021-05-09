const db = require("../models");
const Message = db.message;

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

module.exports = function(app) {
    app.get('/messages', (req, res) => {
        Message.find({},(err, messages)=> {
          res.send(messages);
        })
    })
      
    app.post('/messages', (req, res) => {
        var message = new Message(req.body);
        message.save((err) =>{
          if(err)
            sendStatus(500);
          io.emit('message', req.body);
          res.sendStatus(200);
        })
    })
};