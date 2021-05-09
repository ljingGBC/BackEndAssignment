//Define Express Server
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('*', cors());

//Store sensetive information to env variables
const dotenv = require('dotenv');
dotenv.config();

//mongoDB Atlas Connection String
const url = process.env.MONGODB_URL;

//Connect to mongoDB Atlas
const connect = mongoose.connect(url, 
{ 
      useNewUrlParser: true,
      useUnifiedTopology: true
});

connect.then((db) => {
      console.log('Connected Successfully to MongoDB!');
}, (err) => {
      console.log("Connection Error!",err);
      process.exit();
});

// simple route to test connection
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Lei Jing's application." });
});


//add routes
require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);

//for Message
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname));

//router for message
require('./routes/messageRouters')(app);
//create a connection
io.on('connection', () =>{
    console.log('a user is connected')
})

const port = process.env.PORT;
app.listen({ port }, () =>
  //http://localhost:5000
  console.log(`Server is running on port ${port}`));
