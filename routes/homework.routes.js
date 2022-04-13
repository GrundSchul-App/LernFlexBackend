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
} = require("../controller/homework.controller.js");

const homeworkRouter = new Router();

homeworkRouter.route("/:teacherId").get(getAllHomeworks);

homeworkRouter.route("/:teacherId/title/:title").get(getAllHomeworksByTitle);

homeworkRouter
  .route("/:teacherId/subject/:subjectId")
  .get(getAllHomeworksBySubjectId);

homeworkRouter.route("/:teacherId/type/:type").get(getAllHomeworksByType);

homeworkRouter.route("/:teacherId/date/:date").get(getAllHomeworksByDate);

homeworkRouter.route("/:teacherId/add").post(addHomework);

homeworkRouter
  .route("/:id")
  .get(getOneHomework)
  .delete(deleteHomework)
  .put(updateHomework);

module.exports = homeworkRouter;
