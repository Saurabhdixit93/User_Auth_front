const express = require("express");
const mongoose = require("mongoose");
const cookiParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
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
app.use("/", Routes);

ConnectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Connected Server In PORT : ${PORT}`);
  });
});
