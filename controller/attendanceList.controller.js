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
      .populate("class", "className")
      .populate("subject", "name")
      .populate("teacher", "firstName")
      .populate("absent", "lastName");

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
  //const { date, classId, subject, teacher, absent } = req.body;
  try {
    const newAttendanceList = await AttendanceList.create(req.body);
    res.status(200).json({
      message: "success",
      data: newAttendanceList,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Abwesenheit Liste erstellen!",
    });
    console.error(error);
  }
}

async function getOneAttendanceList(req, res) {
  const { date, subjectId, classId } = req.params;

  try {
    const OneAttendanceList = await AttendanceList.findOne({
      date: {
        $gte: startOfDay(new Date(date)),
        $lte: endOfDayfrom(new Date(date)),
      },
      subject: subjectId,
      class: classId,
    })
      /*  .populate("class", "className")
      .populate("subject", "name")
      .populate("teacher", "firstName")*/
      .populate("absent"); //.populate("absent", "lastName");

    if (!OneAttendanceList) {
      return res.status(400).json({
        message: `Abwesendheitliste für ${date} nicht gefunden!`,
      });
    } else {
      res.status(200).json({
        message: "success",
        data: OneAttendanceList.absent,
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
