const express = require("express");
const router = express.Router();
const UserRoutes = require("./UserRoutes");

router.use("/user", UserRoutes);

module.exports = router;
