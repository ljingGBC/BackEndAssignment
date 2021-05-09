const db = require("../models");
const User = db.user;

// check duplicate username or email when register a new account
checkUsernameOrEmail = (req, res, next) => {
    // check duplicate username
    User.findOne({
      username: req.body.username
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (user) {
        res.status(400).send({ message: "Error! This username is already in use!" });
        return;
      }
  
      // check duplicate email
      User.findOne({
        email: req.body.email
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (user) {
          res.status(400).send({ message: "Error! This email is already in use!" });
          return;
        }
  
        next();
      });
    });
};

const verifyRegistration = {
    checkUsernameOrEmail,
};
  
module.exports = verifyRegistration;