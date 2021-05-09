// Initialize Mongoose
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");

db.message = require("./message");

module.exports = db;