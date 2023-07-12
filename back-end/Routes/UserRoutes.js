const express = require("express");
const router = express.Router();
const {
  CreteAccount,
  UserLoginJWT,
} = require("../Controllers/UserControllers");
const passport = require("passport");

const EnsureLogout = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.send({
      status: false,
      message: "Already Logged in Please Logout first !",
    });
  }
  next();
};

router.post("/signup", CreteAccount);

// router.post("/login", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       return res.send({
//         status: false,
//         message: "An Error occured during local login",
//       });
//     }
//     if (!user) {
//       return res.send({
//         status: false,
//         message: "UserEmail Or Password not matched",
//       });
//     }
//     req.logIn(user, (err) => {
//       if (err) {
//         return res.send({
//           status: false,
//           message: "An Error occured during user login",
//         });
//       }
//       return res.send({
//         status: true,
//         message: "Login Successfull throu passport-local",
//         user: user.userEmail,
//       });
//     });
//   })(req, res, next);
// });

router.post("/login", passport.authenticate("local"), (req, res) => {
  return res.send({
    status: true,
    message: "Login Successfull throu passport-local",
  });
});

router.post("/api/login", UserLoginJWT);

module.exports = router;
