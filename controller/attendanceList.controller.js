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
    .sort({ date: -1, 'classId.className' : -1, 'subject.subject_title' : 1 })
      .populate("classId")
      .populate("subject")
      .populate("teacher")
      .populate("absent")
     

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
// function suche nach attendance list mit Id + Absent id
async function getOneAttendanceByAbsentId(req,res){
  const {attendanceId,absentId}=req.params;
  try{
    const result = await AttendanceList.find({_id:attendanceId,absent:absentId})
    if (!result) {
      return res.status(404).json({
        message: `Abwesendheitliste für ${date} nicht gefunden!`,
      });
    } else {
      res.status(200).json({
        message: "success",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Fehler  Wiedergabe!",
    });
    console.error(error);
  }
}


async function getOneAttendanceList(req, res) {
  const { date, subjectId, classId } = req.params;

  
  try {
    const OneAttendanceList = await AttendanceList.find({
      date: {
        $gte: startOfDay(new Date(date)),
        $lte: endOfDayfrom(new Date(date)),
      },
      subject: subjectId,
      classId: classId,
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



//absent:{$elemMatch:{absentId}

//_id:attendanceListId

async function updateAttendanceList(req,res){
  const {absentId,attendanceListId}=req.params
  try{
   const allAttendanceList=await AttendanceList.findOneAndUpdate({absent:{$elemMatch:{absentId}}},req.body,{ new:true,runValidators:true,context:"query",});
  //  const resultattendances= await allAttendanceList.find({}).populate("absent")
   res.status(200).json({
     message:"success",
     data: allAttendanceList
   });
  }catch(error){
    res.status(500).json({
      message: "Fehler bei Abwesenheitsliste suchen!"
      });
    console.error(error);
  }
}

async function deleteAttendanceList(req, res) {
  const id = req.params.id;
  try {
    await AttendanceList.findByIdAndDelete(id);

    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Abwesenheitliste löschen!",

    });
    console.error(error);
  }
}

module.exports = {
  getAllAttendanceList,
  addAttendanceList,
  getOneAttendanceList,

  updateAttendanceList,
  getOneAttendanceByAbsentId

  deleteAttendanceList

};
