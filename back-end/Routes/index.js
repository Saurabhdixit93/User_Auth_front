const express = require("express");
const router = express.Router();
const UserRoutes = require("./UserRoutes");

router.get("/", (req, res) => {
  return res.send("Success");
});

router.use("/user", UserRoutes);

module.exports = router;
