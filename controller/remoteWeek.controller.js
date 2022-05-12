const RemoteWeek = require("../models/remoteWeek.model.js");
require("../models/subject.model.js");
require("../models/class.model.js");
require("../models/teacher.model.js");
require("../models/student.model.js");
require("../models/homework.model.js");

const endOfDayfrom = require("date-fns/endOfDay");
const startOfDay = require("date-fns/startOfDay");

async function getAllRemoteWeeks(req, res) {
  try {
    const allRemoteWeeks = await RemoteWeek.find()
    //.sort({ "classId.className": 1, startWeekDate: 1 })
    .sort({ startWeekDate: 1 })
    .populate("infoData")
    .populate("classId")
    .populate("monday.subject")
    .populate("tuesday.subject")
    .populate("wednesday.subject")
    .populate("thursday.subject")
    .populate("friday.subject")
    .populate("monday.homeworkData")
    .populate("tuesday.homeworkData")
    .populate("wednesday.homeworkData")
    .populate("thursday.homeworkData")
    .populate("friday.homeworkData")
   
        

    res.status(200).json({
      message: "success",
      data: allRemoteWeeks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Remote Unterricht Wochen Wiedergabe!",
    });
    console.error(error);
  }
}

async function addRemoteWeek(req, res) {
  const { classId } = req.body;
  const startDate = req.params.startDate;
  console.log(startDate);
  console.log("startOfDay(new Date(startDate))", startOfDay(new Date(startDate)));
  console.log("endOfDayfrom(new Date(startDate))", endOfDayfrom(new Date(startDate)));
  console.log("classId", classId);
  console.log("req.body", req.body);

  try {
    const checkRemoteWeek = await RemoteWeek.findOne({       
      /*   $and: [{ startWeekDate: {
            $gte: startOfDay(new Date(startDate)),
            $lte: endOfDay(new Date(startDate)),
          }}, {  classId: classId }] */


           startWeekDate: {
            $gte: startOfDay(new Date(startDate)),
            $lte: endOfDayfrom(new Date(startDate))
        },
            classId: classId,  

       /*      $elemMatch: { startWeekDate: {
                $gte: startOfDay(new Date(startDate)),
                $lte: endOfDay(new Date(startDate)),
              }, classId: classId} */


    })
      .populate("classId", "className")
      
  
    if (checkRemoteWeek) {
      res.status(400).json({
        message: `${checkRemoteWeek.classId.className} - ${startDate} - Remote-Unterricht Woche existiert bereits!`,
      
    });
      return;
    }
  } catch (error) {
    res.status(500).json({
      message: "Interne Fehler!",
    });
    return;
  }

  try {
      console.log(new Date(req.body.startWeekDate));
    const newRemoteWeek = await RemoteWeek.create(req.body);
    res.status(200).json({
      message: "success",  
      data: newRemoteWeek  
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler beim generieren der Remote-Unterricht Woche!",
     
    });
    console.error(error);
  }
}

async function deleteRemoteWeek(req, res) {
  const id = req.params.id;
  try {
    await RemoteWeek.findByIdAndDelete(id);

    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Datei / Hausaufgabe löschen!",
    });
    console.error(error);
  }
}


module.exports = {
    getAllRemoteWeeks,
    addRemoteWeek,
    deleteRemoteWeek,
};
