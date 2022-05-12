const express = require("express");
const router = express.Router();
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventByDate,
} = require("../controller/calEvent.controller");

router.get("/", getEvents);
router.get("/:id", getEventById);
router.get("/date/:date", getEventByDate)
router.put("/:id", updateEvent);
router.post("/", createEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
