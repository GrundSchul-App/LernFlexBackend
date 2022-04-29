const express = require("express");
const router = express.Router();
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controller/calEvent.controller");

router.get("/", getEvents);
router.get("/:id", getEventById);
router.put("/:id", updateEvent);
router.post("/", createEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
