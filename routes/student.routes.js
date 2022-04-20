const express = require('express');
const router = express.Router();
const {
  getStudents,
  getStudent,
  getStudentsByClassId,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controller/student.controller");


router.get("/", getStudents);
router.get("/class/:classId", getStudentsByClassId);
router.get("/:id", getStudent);
router.patch("/:id", updateStudent)
router.post("/", createStudent);
router.delete(
  "/:id", deleteStudent);

module.exports = router;