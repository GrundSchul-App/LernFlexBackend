const AttendanceList = require("../models/attendanceList.model.js");
require("../models/subject.model.js");
require("../models/class.model.js");
require("../models/teacher.model.js");
require("../models/student.model.js");

const endOfDayfrom = require("date-fns/endOfDay");
const startOfDay = require("date-fns/startOfDay");

async function getAllAttendanceList(req, res) {
  try {
    const AllAttendanceList = await AttendanceList.find()
      .populate("classId")
      .populate("subject")
      .populate("teacher")
      .populate("absent");

    res.status(200).json({
      message: "success",
      data: AllAttendanceList,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Absendheitlisten Wiedergabe!",
    });
    console.error(error);
  }
}

async function addAttendanceList(req, res) {
  const { classId, subject } = req.body;
  

  try {
    const checkAttendanceList = await AttendanceList.findOne({
      date: {
        $gte: startOfDay(new Date()),
        $lte: endOfDayfrom(new Date()),
      },
      classId: classId,
      subject: subject,
    })
      .populate("classId", "className")
      .populate("subject", "subject_title");
  
    if (checkAttendanceList) {
      res.status(400).json({
        message: `${checkAttendanceList.classId.className} - ${checkAttendanceList.subject.subject_title}   Absendheitliste für heute existiert bereits!`,
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
    const newAttendanceList = await AttendanceList.create(req.body);
    res.status(200).json({
      message: "Heutige Abwesenheitsliste erfolgreich gespeichert!",
      /* data: newAttendanceList, */
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler beim generieren der Abwesendheitsliste!",
    });
    console.error(error);
  }
}

async function getOneAttendanceList(req, res) {
  const { date, subjectId, classId } = req.params;
  
//   const ghania=format(selectDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
// console.log("startdate",  startOfDay(new Date(date)));
//   console.log("ghania backend", ghania);
// console.log("databackend", new Date(date));
  try {
    const OneAttendanceList = await AttendanceList.find({
      date: {
        $gte: startOfDay(new Date(date)),
        $lte: endOfDayfrom(new Date(date)),
      },
      subject: subjectId,
      classId: classId
    })
    .populate("classId")
    .populate("subject")
    .populate("teacher")
    .populate("absent");
      /*  .populate("class", "className")
      .populate("subject", "name")
      .populate("teacher", "firstName")*/
      // .populate("absent"); //.populate("absent", "lastName");

    if (!OneAttendanceList) {
      return res.status(404).json({
        message: `Abwesendheitliste für ${date} nicht gefunden!`,
      });
    } else {
      res.status(200).json({
        message: "success",
        data: OneAttendanceList,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Abwesenheit Liste Wiedergabe!",
    });
    console.error(error);
  }
}

module.exports = {
  getAllAttendanceList,
  addAttendanceList,
  getOneAttendanceList,
};
