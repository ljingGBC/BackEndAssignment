//check token to process Authentication & Authorization
const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) { //check if token is provided or not
      return res.status(403).send({ message: "No token provided!" });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => { //check token is legal or not
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
};

const JwtAuth = {
    verifyToken,
};

module.exports = JwtAuth;