const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
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
app.use(cookiParser());
app.use(express.json());
// Add CORS headers middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.JWT_PRIVATE_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: process.env.MONGO_URL,
        autoRemove: "disabled",
      },
      (err) => {
        if (err) {
          console.log(
            "Error while trying to establish the connection and store session cookie:",
            err
          );
          return;
        }
        console.log("connect-mongo setup okay");
        return;
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use("/", Routes);

ConnectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Connected Server In PORT : ${PORT}`);
  });
});
