const { Router } = require("express");
const { getSubject } = require("../controller/subject.controller");
const {
  createTeacher,
  findTeacherById,
  findTeacherByClass,
  findTeacherBySubject,
  sortTeacherByFirstName,
  getTeacher,
  updateTeacher,
  deleteTeacher,
  findTeacherByClassAndSubject,
  findTeacherAndSubjectsByClassId
} = require("../controller/teacher.controller");

const teacherRouter = new Router();

teacherRouter.get("/teacher", getTeacher);
teacherRouter.get("/getTeacherById/:id", findTeacherById);
teacherRouter.get("/getTeacherByClass/:classId", findTeacherByClass);
teacherRouter.get("/teacher/:classId/:subjectId", findTeacherByClassAndSubject);
teacherRouter.get("/teacher/:classId",findTeacherAndSubjectsByClassId);
teacherRouter.get("/getTeacherBySubject/:subject_codeId", findTeacherBySubject);
teacherRouter.put("/update/:id", updateTeacher);

teacherRouter.get("/sortTeacher", sortTeacherByFirstName);

teacherRouter.post("/addTeacher", createTeacher);
teacherRouter.delete("/removeTeacher/:id", deleteTeacher);

module.exports = teacherRouter;
