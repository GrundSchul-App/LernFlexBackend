const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controller/user.controller");

router.post('/landing', loginUser);
// router.post('/register', registerUser);
router.get('/logout', logoutUser);
 
module.exports = router;