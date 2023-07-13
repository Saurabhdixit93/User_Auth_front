const express = require("express");
const mongoose = require("mongoose");
// const session = require("express-session");
// const MongoStore = require("connect-mongo");
const cookiParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local");
const passportLocalConfig = require("./Configration/Passport-local");
const Routes = require("./Routes/index");
const { ConnectDb } = require("./Configration/Database");
const PORT = process.env.PORT;
const app = express();
// middleWares
app.use(
  cors({
    credentials: true,
    origin: process.env.HOME_URL,
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(cookiParser());
app.use(express.urlencoded({ extended: false }));

// app.use(
//   session({
//     name: process.env.SESSION_NAME,
//     secret: process.env.JWT_PRIVATE_KEY,
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//       maxAge: 1000 * 60 * 100,
//     },
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(passport.setAuthenticatedUser);

app.use("/", Routes);

ConnectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Connected Server In PORT : ${PORT}`);
  });
});
