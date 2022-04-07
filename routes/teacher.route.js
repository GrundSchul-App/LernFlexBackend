const { Router } = require("express");
const {
  createTeacher,
  findTeacherById,
  getTeacher,
  updateTeacher,deleteTeacher
} = require("../controller/teacher.controller");

const teacherRouter = new Router();

teacherRouter.get("/teacher", getTeacher);
teacherRouter.get("/getTeacherById/:id", findTeacherById);

teacherRouter.put("/update/:id", updateTeacher);

teacherRouter.post("/addTeacher", createTeacher);
teacherRouter.delete("/removeTeacher/:id", deleteTeacher)

module.exports = teacherRouter;
