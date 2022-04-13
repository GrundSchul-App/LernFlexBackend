const { Router } = require("express");
const {
  getAllAttendanceList,
  addAttendanceList,
  getOneAttendanceList,
} = require("../controller/attendanceList.controller.js");

const attendanceListRouter = new Router();

attendanceListRouter.route("/").get(getAllAttendanceList);

attendanceListRouter.route("/add").post(addAttendanceList);

attendanceListRouter
  .route("/:date/:subjectId/:classId")
  .get(getOneAttendanceList);

module.exports = attendanceListRouter;
