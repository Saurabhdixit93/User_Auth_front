const passport = require("passport");
const passportLocal = require("passport-local");
const LocalStrategy = passportLocal.Strategy;
const UserModel = require("../Models/UserModel");
const bcryptjs = require("bcryptjs");

passport.use(
  new LocalStrategy(
    {
      usernameField: "userEmail",
      passwordField: "userPassword",
      passReqToCallback: true,
    },
    async (req, userEmail, userPassword, done) => {
      try {
        const user = await UserModel.findOne({ userEmail: userEmail });
        if (!user) {
          return done(null, false, { message: "User Not Found" });
        }
        const PasswordMatch = await bcryptjs.compare(
          userPassword,
          user.userPassword
        );
        if (!PasswordMatch) {
          return done(null, false, { message: "Wrong Or Invalid Password" });
        }
        return done(null, user, { message: "Login Successfully" });
      } catch (err) {
        return done(null, false, {
          message: `Error In Login : ${err.message}`,
        });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  await UserModel.findById(id)
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      return done(null, false, { message: `Error in : ${err.message}` });
    });
});

passport.checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.send({ status: false, message: "Login First To Access" });
};

passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    return (res.locals.user = req.user);
  }
  next();
};

module.exports = passport;
