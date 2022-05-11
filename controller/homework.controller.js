const Homework = require("../models/homework.model.js");
require("../models/student.model.js");
require("../models/subject.model.js");
require("../models/teacher.model.js");

const endOfDayfrom = require("date-fns/endOfDay");
const startOfDay = require("date-fns/startOfDay");
const format = require("date-fns/format");

/* async function getAllHomeworks(req, res) {
  const { teacherId } = req.params;
  try {
    const AllHomeworks = await Homework.find({ teacherId })
    .populate("subject", "subject_code");

    res.status(200).json({
      message: "success",
      data: AllHomeworks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Datei / Hausaufgaben Wiedergabe!",
    });
    console.error(error);
  }
} */

async function getAllHomeworks(req, res) {
  try {
    const AllHomeworks = await Homework.find({})
      /*  .populate({path: 'subject', options: { sort: [['subject_code', 'asc']] }}) */
      .populate("teacher", "lastName")
      .populate("subject", "subject_code")
      .sort({ teacher: -1, subject: 1 });
      

    // .populate("students", "lastName")
    /*   .populate("subject", "subject_code")
      .sort({ "subject.subject_code": 1} )   */
    /* .populate("subject", "subject_code", null , { sort: [{subject_code: 1 }] })   */
    /* .populate("subject", "subject_code").sort({ "subject_code": 1 }) */

    res.status(200).json({
      message: "success",
      data: AllHomeworks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Datei / Hausaufgaben Wiedergabe!",
    });
    console.error(error);
  }
}

async function getAllHomeworksByTeacher(req, res) {
  const { teacherId } = req.params;
  try {
    const AllHomeworks = await Homework.find({
      teacher: teacherId      
    })
    .populate("teacher", "lastName")
    .populate("subject", "subject_code")
    .sort({ subject: 1 });
    res.status(200).json({
      message: "success",
      data: AllHomeworks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Datei / Hausaufgaben Wiedergabe!",
    });
    console.error(error);
  }
}

async function getAllHomeworksByTitle(req, res) {
  const { teacherId, title } = req.params;
  try {
    const AllHomeworks = await Homework.find({
      teacher: teacherId,
      title,
    })
      .populate("students", "lastName")
      .populate("subject", "name");
    res.status(200).json({
      message: "success",
      data: AllHomeworks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Datei / Hausaufgaben Wiedergabe!",
    });
    console.error(error);
  }
}

/* async function getAllHomeworksBySubjectId(req, res) {
  const { teacherId, subjectId } = req.params;
  try {
    const AllHomeworks = await Homework.find({
      $and: [{ teacher: teacherId }, { subject: subjectId }],
    })
     
      .populate("subject", "subject_code");

    res.status(200).json({
      message: "success",
      data: AllHomeworks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Datei / Hausaufgaben Wiedergabe!",
    });
    console.error(error);
  }
} */

async function getAllHomeworksBySubjectId(req, res) {
  const { subjectId } = req.params;
  try {
    const AllHomeworks = await Homework.find({
      //$and: [{ teacher: teacherId }, { subject: subjectId }],
      subject: subjectId 
    })
      /* .populate("students", "lastName") */
      .populate("teacher", "lastName")
    .populate("subject", "subject_code")
    .sort({ teacher: -1 });

    res.status(200).json({
      message: "success",
      data: AllHomeworks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Datei / Hausaufgaben Wiedergabe!",
    });
    console.error(error);
  }
}

/* async function getAllHomeworksByType(req, res) {
  const { teacherId, type } = req.params;
  try {
    const AllHomeworks = await Homework.find({
      $and: [{ teacher: teach2022-05-06erId }, { type }],
    })
      
      .populate("subject", "subject_code");

    res.status(200).json({
      message: "success",
      data: AllHomeworks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Datei / Hausaufgaben Wiedergabe!",
    });
    console.error(error);
  }
} */

async function getAllHomeworksByType(req, res) {
  const { type } = req.params;
  try {
    const AllHomeworks = await Homework.find({
     // $and: [{ teacher: teacherId }, { type }],
     type
    })      
    .populate("teacher", "lastName")
    .populate("subject", "subject_code")
    .sort({ teacher: -1, subject: 1 });

    res.status(200).json({
      message: "success",
      data: AllHomeworks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Datei / Hausaufgaben Wiedergabe!",
    });
    console.error(error);
  }
}

async function getAllHomeworksByDate(req, res) {
  const { teacherId, date } = req.params;
  try {
    const AllHomeworks = await Homework.find({
      teacher: teacherId,
      createdAt: {
        $gte: startOfDay(new Date(date)),
        $lte: endOfDayfrom(new Date(date)),
      },
    })
      .populate("students", "lastName")
      .populate("subject", "name");

    // console.log(format(AllHomeworks[0].createdAt, 'yyyy-MM-dd'));

    res.status(200).json({
      message: "success",
      data: AllHomeworks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Datei / Hausaufgaben Wiedergabe!",
    });
    console.error(error);
  }
}

/* async function addHomework(req, res) {
  const { title, fileName, link, description, type, subject } = req.body;
  const { teacherId } = req.params;
  try {
    const newHomework = await Homework.create({
      title,
      fileName,
      link,
      description,
      type,
      subject,
      teacher: teacherId,
    });
    res.status(200).json({
      message: "success",
      data: newHomework,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Datei / Hausaufgaben erstellen!",
    });
    console.error(error);
  }
} */

async function addHomework(req, res) {  
 
  try {
    const newHomework = await Homework.create(req.body);
    res.status(200).json({
      message: "success",
      data: newHomework,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Datei / Hausaufgaben erstellen!",
    });
    console.error(error);
  }
} 

async function getOneHomework(req, res) {}

async function deleteHomework(req, res) {
  const id = req.params.id;
  try {
    await Homework.findByIdAndDelete(id);

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



async function updateHomework(req, res) {
  const id = req.params.id;
  try {
    const updatedHomework = await Homework.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      context: "query",
    });
    /*  .populate("students", "lastName")
      .populate("subject", "name"); */
    res.status(200).json({
      message: "success",
      data: updatedHomework,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Datei / Hausaufgabe aktualisieren!",
    });
    console.error(error);
  }
}

async function updateStudentHomework(req, res) {
  const id = req.params.id;
  console.log("backend reqBody", req.body);
  try {
    const updatedHomework = await Homework.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      context: "query",
    });
    const resultHomework= await Homework.find({}).populate("students")
    /*  .populate("students", "lastName")
      .populate("subject", "name"); */
    res.status(200).json({
      message: "success",
      data:updatedHomework
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Datei / Hausaufgabe aktualisieren!",
    });
    console.error(error);
  }
}

module.exports = {
  getAllHomeworks,
  addHomework,
  getOneHomework,
  deleteHomework,
  updateHomework,
  getAllHomeworksByTitle,
  getAllHomeworksBySubjectId,
  getAllHomeworksByType,
  getAllHomeworksByDate,
  getAllHomeworksByTeacher,
  updateStudentHomework,
};
