const { Router } = require("express");
const {
  getAllHomeworks,
  addHomework,
  getOneHomework,
  deleteHomework,
  updateHomework,
  getAllHomeworksByTitle,
  getAllHomeworksBySubjectId,
  getAllHomeworksByType,
  getAllHomeworksByDate,
  getAllHomeworksByTeacher,
  updateStudentHomework,
} = require("../controller/homework.controller.js");

const homeworkRouter = new Router();

homeworkRouter.route("/").get(getAllHomeworks);

homeworkRouter.route("/teacher/:teacherId").get(getAllHomeworksByTeacher);

homeworkRouter.route("/:teacherId/title/:title").get(getAllHomeworksByTitle);

homeworkRouter.route("/subject/:subjectId").get(getAllHomeworksBySubjectId);

homeworkRouter.route("/type/:type").get(getAllHomeworksByType);

homeworkRouter.route("/:teacherId/date/:date").get(getAllHomeworksByDate);

homeworkRouter.route("/").post(addHomework);

homeworkRouter
  .route("/:id")
  .get(getOneHomework)
  .delete(deleteHomework)
  .put(updateHomework);

homeworkRouter.route("/updateStudentHomework/:id").put(updateStudentHomework);

module.exports = homeworkRouter;
