const express = require("express");
const router = express.Router();
const { CreteAccount } = require("../Controllers/UserControllers");
const passport = require("passport");
router.post("/signup", CreteAccount);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.send({
        status: false,
        message: "An Error occured during local login",
      });
    }
    if (!user) {
      return res.send({
        status: false,
        message: "UserEmail Or Password not matched",
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.send({
          status: false,
          message: "An Error occured during user login",
        });
      }
      return res.send({
        status: true,
        message: "Login Successfull",
        user: user.userEmail,
      });
    });
  })(req, res, next);
});

module.exports = router;
