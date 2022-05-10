const express = require("express");
const router = express.Router();
const {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  registerUser,
  // loginUser,
  // logoutUser,
} = require("../controller/user.controller");

router.get("/:userId", getUser);
router.get("/", getAllUsers);
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser);
router.post("/register", registerUser);
// router.post("/logout", logoutUser);


module.exports = router;
