const { Router } = require("express");
const {
  createTeacher,
  findTeacherById,
  findTeacherByClass,
  findTeacherBySubject,
  sortTeacherByFirstName,
  getTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controller/teacher.controller");

const teacherRouter = new Router();

teacherRouter.get("/teacher", getTeacher);
teacherRouter.get("/getTeacherById/:id", findTeacherById);
teacherRouter.get("/getTeacherBy/:class", findTeacherByClass);
teacherRouter.get("/getTeacherBySubject", findTeacherBySubject);
teacherRouter.put("/update/:id", updateTeacher);

teacherRouter.get("/sortTeacher", sortTeacherByFirstName);

teacherRouter.post("/addTeacher", createTeacher);
teacherRouter.delete("/removeTeacher/:id", deleteTeacher);

module.exports = teacherRouter;
