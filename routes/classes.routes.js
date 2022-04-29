const express = require("express");
const router = express.Router();
const {
  getClasses,
  createClass,
  updateClass,
  deleteClass,
  getClass,
  getClassByClassTeacherId,
  getClassByModule,
} = require("../controller/class.controller");

router.get("/", getClasses);
router.get("/:id", getClass);
router.get("/teacher/:classTeacher", getClassByClassTeacherId);
router.get("/module/:subjectId/:teacherId", getClassByModule);
router.post("/", createClass);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);

// router.patch("/:id", updateClass);

module.exports = router;
