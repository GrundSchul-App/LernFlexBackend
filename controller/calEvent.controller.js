const Event = require("../models/calEvent.model");
const endOfDayfrom = require("date-fns/endOfDay");
const startOfDay = require("date-fns/startOfDay");

async function getEvents(req, res) {
  try {
    const events = await Event.find({});
    res.status(200).json({ data: events, totalEvents: events.length, message: "success"});
  } catch (err) {
    res.status(500).json({ err });
  }
}
async function getEventByDate(req,res){
  const date=req.params.date;
  console.log(date);
  console.log("res1", startOfDay(new Date(date)));
  console.log("ende",endOfDayfrom(new Date(date)));
  console.log("now",new Date(Date.now()))
  
  
  try{
    const allEvents=await Event.find({
     
      date:{
        $gte:startOfDay(new Date(date)),
        $lte:endOfDayfrom(new Date(date)),
      },
    });
    res.status(200).json({
      message:"success",
      data:allEvents,
    });
  }catch(error){
    res.status(500).json({
      message:"Fehler bei Event Wiedergabe!"
    })
    console.error(error)
  }
}

async function getEventById(req, res) {
  const { id } = req.params;
  try {
    const singleEvent = await Event.findOne({_id: id});

    res.status(200).json({
      message: "success",
      event: singleEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Kein Event gefunden!",
    });
    console.error(error);
  }
}


async function createEvent(req, res) {
  try {
    const newEvent = await Event.create(req.body);
    res
      .status(201)
      .json({ newEvent, success: "Event successfully created" });
  } catch (err) {
    res.status(500).json({ err });
  }
}

async function updateEvent(req, res) {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true, context: "query" }
    );
    res.status(200).json({
      message: "success",
       event: event,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Event Update!",
    });
    console.error(error);
  }
}

async function deleteEvent(req, res) {
  const event = await Event.findById({ _id: req.params.id });
  if (event) {
    await event.remove();
    res.json({ message: "Event removed" });
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
}

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventByDate,
};
