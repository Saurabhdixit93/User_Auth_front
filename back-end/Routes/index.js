const express = require("express");
const router = express.Router();
const UserRoutes = require("./UserRoutes");
const cors = require("cors");

// router.use(
//   cors({
//     credentials: true,
//     origin: process.env.HOME_URL,
//     methods:["POST","GET","PUT","DELETE"]
//   })
// );
router.use("/user", UserRoutes);

module.exports = router;
