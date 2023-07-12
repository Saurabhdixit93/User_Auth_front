const express = require("express");
const router = express.Router();
const UserRoutes = require("./UserRoutes");
const passport = require("passport");
const { VERIFYJWT } = require("../Configration/Jwt_Auth");

router.get("/", (req, res) => {
  return res.send("Success");
});
router.get("/page", VERIFYJWT, (req, res) => {
  return res.send({ status: true, message: "Protected Rout Accessed" });
});

router.use("/user", UserRoutes);

module.exports = router;
