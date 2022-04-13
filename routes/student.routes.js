const express = require('express');
const router = express.Router();
const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controller/student.controller");


router.get("/", getStudents);
router.get("/:id", getStudent);
router.patch("/:id", updateStudent)
router.post("/", createStudent);
router.delete(
  "/:id", deleteStudent);

module.exports = router;