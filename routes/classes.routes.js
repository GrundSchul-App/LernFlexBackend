const express = require("express");
const router = express.Router();
const { getClasses, createClass, updateClass, deleteClass, getClass } = require("../controller/class.controller");

router.get("/", getClasses);
router.get("/:id", getClass)
router.post("/", createClass);
router.patch("/:id", updateClass);
router.delete("/:id", deleteClass);

// router.patch("/:id", updateClass);

module.exports = router;
