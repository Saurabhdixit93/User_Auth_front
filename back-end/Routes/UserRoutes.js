const express = require("express");
const router = express.Router();
const {
  CreteAccount,
  UserLoginJWT,
} = require("../Controllers/UserControllers");

router.post("/signup", CreteAccount);
router.post("/api/login", UserLoginJWT);

module.exports = router;
