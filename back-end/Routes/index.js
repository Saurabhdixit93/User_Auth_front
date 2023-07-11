const express = require("express");
const router = express.Router();
const UserRoutes = require("./UserRoutes");
const passport = require("passport");

router.get("/", (req, res) => {
  return res.send("Success");
});
router.get('/page',passport.checkAuthentication ,(req,res) => {
  return res.send({status: true,message:'Protected Rout Accessed'});
})

router.use("/user", UserRoutes);

module.exports = router;
