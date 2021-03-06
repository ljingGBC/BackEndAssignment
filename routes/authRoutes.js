//Authentication Routes
const { verifyRegistration } = require("../middlewares");
const controller = require("../controllers/authController");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/register",
    [
        verifyRegistration.checkUsernameOrEmail,
    ],
    controller.register
  );

  app.post("/api/auth/signin", controller.signin);
};