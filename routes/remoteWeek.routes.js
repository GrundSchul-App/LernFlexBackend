const { Router } = require("express");
const {
  getAllRemoteWeeks,
  addRemoteWeek,
  deleteRemoteWeek
  
} = require("../controller/remoteWeek.controller.js");

const remoteWeekRouter = new Router();


remoteWeekRouter.route("/").get(getAllRemoteWeeks);
remoteWeekRouter.route("/:startDate").post(addRemoteWeek);
remoteWeekRouter.route("/:id").delete(deleteRemoteWeek);


module.exports = remoteWeekRouter;