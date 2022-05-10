const { Router } = require("express");
const {
  getAllAttendanceList,
  addAttendanceList,
  getOneAttendanceList,

  updateAttendanceList,
  getOneAttendanceByAbsentId,

  deleteAttendanceList

} = require("../controller/attendanceList.controller.js");

const attendanceListRouter = new Router();

attendanceListRouter.route("/").get(getAllAttendanceList);

attendanceListRouter.route("/add").post(addAttendanceList);
attendanceListRouter.route("/update/:absentId").put(updateAttendanceList);

attendanceListRouter .route("/:date/:subjectId/:classId").get(getOneAttendanceList);

attendanceListRouter .route("/:attendanceId/:absentId").get(getOneAttendanceByAbsentId);



attendanceListRouter.route("/:id").delete(deleteAttendanceList);

attendanceListRouter
  .route("/:date/:subjectId/:classId")
  .get(getOneAttendanceList);


module.exports = attendanceListRouter;
