// Authorization Routes

const { jwtAuth } = require("../middlewares");
const controller = require("../controllers/userController");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/public", controller.publicAccess);

  app.get("/api/test/user", [jwtAuth.verifyToken], controller.userAccess);
};